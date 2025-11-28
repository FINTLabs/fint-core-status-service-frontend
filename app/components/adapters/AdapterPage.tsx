import { useState, useMemo } from "react";
import { Box } from "@navikt/ds-react";
import { AdapterFilter } from "./AdapterFilter";
import { AdapterTable } from "./AdapterTable";
import { AdapterDetailModal } from "./AdapterDetailModal";
import type { IAdapter, IAdaptereTableRow } from "~/types";

interface AdapterPageProps {
  initialData: IAdapter;
  env: string;
}

export function AdapterPage({ initialData }: AdapterPageProps) {
  const [sortState, setSortState] = useState<{ orderBy: string; direction: "ascending" | "descending" } | undefined>(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // const [statusFilter, setStatusFilter] = useState<{
  //   ok: boolean;
  //   error: boolean;
  // }>({ ok: true, error: true });
  const [heartbeatFilter, setHeartbeatFilter] = useState<{
    active: boolean;
    inactive: boolean;
  }>({ active: true, inactive: true });
  const [organisationFilter, setOrganisationFilter] = useState<string>("");
  const [domainFilter, setDomainFilter] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>(undefined);
  const [selectedRow, setSelectedRow] = useState<IAdaptereTableRow | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSortChange = (sortKey: string) => {
    let newDirection: "ascending" | "descending" = "ascending";

    if (sortState?.orderBy === sortKey && sortState?.direction === "ascending") {
      newDirection = "descending";
    }

    const newSortState = { orderBy: sortKey, direction: newDirection };
    setSortState(newSortState);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = (value: { ok: boolean; error: boolean }) => {
    // setStatusFilter(value);
    console.log("status filter change", value);
    setCurrentPage(1);
  };

  const handleHeartbeatFilterChange = (value: { active: boolean; inactive: boolean }) => {
    setHeartbeatFilter(value);
    setCurrentPage(1);
  };

  const handleOrganisationFilterChange = (value: string) => {
    setOrganisationFilter(value);
    setCurrentPage(1);
  };

  const handleDomainFilterChange = (value: string) => {
    setDomainFilter(value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (range: { from?: Date; to?: Date } | undefined) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    // setStatusFilter({ ok: true, error: true });
    setHeartbeatFilter({ active: true, inactive: true });
    setOrganisationFilter("");
    setDomainFilter("");
    setDateRange(undefined);
    setCurrentPage(1);
  };

  const handleRowClick = (row: IAdaptereTableRow) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const tableData: IAdaptereTableRow[] = useMemo(() => {
    return Object.entries(initialData || {}).flatMap(([organisation, packages]) =>
      packages.map((pkg) => ({
        organisation,
        packageName: pkg.packageName,
        healty: pkg.healty,
        heartBeat: pkg.heartBeat,
        lastDelta: pkg.lastDelta,
        lastFull: pkg.lastFull,
      }))
    );
  }, [initialData]);

  const uniqueOrganisations = useMemo(() => {
    return [...new Set(Object.keys(initialData || {}))].sort();
  }, [initialData]);

  const uniqueDomains = useMemo(() => {
    return [...new Set(Object.values(initialData || {}).flatMap((packages) => packages.map((pkg) => pkg.packageName)))].sort();
  }, [initialData]);

  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      const isHeartbeatActive = item.heartBeat;
      if (isHeartbeatActive && !heartbeatFilter.active) {
        return false;
      }
      if (!isHeartbeatActive && !heartbeatFilter.inactive) {
        return false;
      }

      if (organisationFilter && !item.organisation.toLowerCase().includes(organisationFilter.toLowerCase())) {
        return false;
      }

      if (domainFilter && !item.packageName.toLowerCase().includes(domainFilter.toLowerCase())) {
        return false;
      }

      // Date range filter for last full sync
      if (dateRange?.from || dateRange?.to) {
        const lastFullDate = item.lastFull?.date;
        if (!lastFullDate) {
          return false; // Exclude items without last full sync date
        }

        // Convert timestamp to Date (assuming timestamp is in milliseconds)
        const syncDate = new Date(lastFullDate);

        if (dateRange.from && dateRange.to) {
          const fromDate = new Date(dateRange.from);
          fromDate.setHours(0, 0, 0, 0);
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          if (syncDate < fromDate || syncDate > toDate) {
            return false;
          }
        } else if (dateRange.from) {
          const fromDate = new Date(dateRange.from);
          fromDate.setHours(0, 0, 0, 0);
          if (syncDate < fromDate) {
            return false;
          }
        } else if (dateRange.to) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          if (syncDate > toDate) {
            return false;
          }
        }
      }

      return true;
    });
  }, [tableData, heartbeatFilter, organisationFilter, domainFilter, dateRange]);

  const sortedFilteredData = useMemo(() => {
    if (!sortState) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortState.orderBy as keyof IAdaptereTableRow];
      const bValue = b[sortState.orderBy as keyof IAdaptereTableRow];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortState.direction === "ascending" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        return sortState.direction === "ascending" ? (aValue === bValue ? 0 : aValue ? 1 : -1) : aValue === bValue ? 0 : aValue ? -1 : 1;
      }

      return 0;
    });
  }, [filteredData, sortState]);
  return (
    <Box padding="8" paddingBlock="2">
      <AdapterFilter
        heartbeatFilter={heartbeatFilter}
        organisationFilter={organisationFilter}
        domainFilter={domainFilter}
        dateRange={dateRange}
        uniqueOrganisations={uniqueOrganisations}
        uniqueDomains={uniqueDomains}
        onStatusFilterChange={handleStatusFilterChange}
        onHeartbeatFilterChange={handleHeartbeatFilterChange}
        onOrganisationFilterChange={handleOrganisationFilterChange}
        onDomainFilterChange={handleDomainFilterChange}
        onDateRangeChange={handleDateRangeChange}
        onClearFilters={handleClearFilters}
      />

      <AdapterTable
        data={sortedFilteredData}
        sortState={sortState}
        onSortChange={handleSortChange}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onRowClick={handleRowClick}
      />

      <AdapterDetailModal isOpen={isModalOpen} onClose={handleCloseModal} data={selectedRow} />
    </Box>
  );
}
