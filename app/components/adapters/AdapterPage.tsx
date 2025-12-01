import { useEffect, useMemo, useState } from "react";
import { Box } from "@navikt/ds-react";
import { AdapterFilter } from "./AdapterFilter";
import { AdapterTable } from "./AdapterTable";
import type { IAdapter } from "~/types";

interface AdapterPageProps {
  initialData: IAdapter[];
  env: string;
}

export function AdapterPage({ initialData }: AdapterPageProps) {
  const [sortState, setSortState] = useState<{ orderBy: string; direction: "ascending" | "descending" } | undefined>(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [statusFilter, setStatusFilter] = useState<Record<string, boolean>>({});
  // Removed heartbeatFilter as it's not in the new data structure
  // const [heartbeatFilter, setHeartbeatFilter] = useState<{
  //   active: boolean;
  //   inactive: boolean;
  // }>({ active: true, inactive: true });
  const [organisationFilter, setOrganisationFilter] = useState<string>("");
  const [domainFilter, setDomainFilter] = useState<string>("");
  // Date range removed as it's not in the new data structure
  // const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>(undefined);
  const [selectedRow, setSelectedRow] = useState<IAdapter | null>(null);
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

  const handleStatusFilterChange = (value: Record<string, boolean>) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // Removed heartbeat filter handler as it's not in the new data structure
  // const handleHeartbeatFilterChange = (value: { active: boolean; inactive: boolean }) => {
  //   setHeartbeatFilter(value);
  //   setCurrentPage(1);
  // };

  const handleOrganisationFilterChange = (value: string) => {
    setOrganisationFilter(value);
    setCurrentPage(1);
  };

  const handleDomainFilterChange = (value: string) => {
    setDomainFilter(value);
    setCurrentPage(1);
  };

  // Date range handler removed as it's not in the new data structure
  // const handleDateRangeChange = (range: { from?: Date; to?: Date } | undefined) => {
  //   setDateRange(range);
  //   setCurrentPage(1);
  // };

  const handleClearFilters = () => {
    // Reset status filter to all selected
    const resetStatusFilter: Record<string, boolean> = {};
    uniqueStatuses.forEach((status) => {
      resetStatusFilter[status] = true;
    });
    setStatusFilter(resetStatusFilter);
    setOrganisationFilter("");
    setDomainFilter("");
    setCurrentPage(1);
  };

  const handleRowClick = (row: IAdapter) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const tableData: IAdapter[] = useMemo(() => {
    return initialData || [];
  }, [initialData]);

  const uniqueOrganisations = useMemo(() => {
    return [...new Set((initialData || []).map((adapter) => adapter.organzation))].sort();
  }, [initialData]);

  const uniqueDomains = useMemo(() => {
    return [...new Set((initialData || []).map((adapter) => adapter.domain))].sort();
  }, [initialData]);

  const uniqueStatuses = useMemo(() => {
    return [...new Set((initialData || []).map((adapter) => adapter.status))].sort();
  }, [initialData]);

  // Initialize status filter with all statuses selected by default
  useEffect(() => {
    if (uniqueStatuses.length > 0 && Object.keys(statusFilter).length === 0) {
      const initialFilter: Record<string, boolean> = {};
      uniqueStatuses.forEach((status) => {
        initialFilter[status] = true;
      });
      setStatusFilter(initialFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueStatuses]);

  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      if (organisationFilter && !item.organzation.toLowerCase().includes(organisationFilter.toLowerCase())) {
        return false;
      }

      if (domainFilter && !item.domain.toLowerCase().includes(domainFilter.toLowerCase())) {
        return false;
      }

      // Status filter
      if (Object.keys(statusFilter).length > 0 && !statusFilter[item.status]) {
        return false;
      }

      return true;
    });
  }, [tableData, organisationFilter, domainFilter, statusFilter]);

  const sortedFilteredData = useMemo(() => {
    if (!sortState) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortState.orderBy as keyof IAdapter];
      const bValue = b[sortState.orderBy as keyof IAdapter];

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
        statusFilter={statusFilter}
        organisationFilter={organisationFilter}
        domainFilter={domainFilter}
        uniqueStatuses={uniqueStatuses}
        uniqueOrganisations={uniqueOrganisations}
        uniqueDomains={uniqueDomains}
        onStatusFilterChange={handleStatusFilterChange}
        onOrganisationFilterChange={handleOrganisationFilterChange}
        onDomainFilterChange={handleDomainFilterChange}
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
    </Box>
  );
}
