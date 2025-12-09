import { useMemo, useState } from "react";
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

  const [heartbeatFilter, setHeartbeatFilter] = useState<{
    active: boolean;
    inactive: boolean;
  }>({ active: true, inactive: true });
  const [organisationFilter, setOrganisationFilter] = useState<string>("");
  const [domainFilter, setDomainFilter] = useState<string>("");

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

  const handleClearFilters = () => {
    setHeartbeatFilter({ active: true, inactive: true });
    setOrganisationFilter("");
    setDomainFilter("");
    setCurrentPage(1);
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

  const filteredData = useMemo(() => {
    return tableData.filter((item) => {
      if (organisationFilter && !item.organzation.toLowerCase().includes(organisationFilter.toLowerCase())) {
        return false;
      }

      if (domainFilter && !item.domain.toLowerCase().includes(domainFilter.toLowerCase())) {
        return false;
      }

      // Heartbeat filter
      if (item.heartBeat && !heartbeatFilter.active) {
        return false;
      }
      return !(!item.heartBeat && !heartbeatFilter.inactive);
    });
  }, [tableData, organisationFilter, domainFilter, heartbeatFilter]);

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
        heartbeatFilter={heartbeatFilter}
        organisationFilter={organisationFilter}
        domainFilter={domainFilter}
        uniqueOrganisations={uniqueOrganisations}
        uniqueDomains={uniqueDomains}
        onHeartbeatFilterChange={handleHeartbeatFilterChange}
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
      />
    </Box>
  );
}
