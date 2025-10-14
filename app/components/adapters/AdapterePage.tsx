import { useState } from "react";
import { Box } from "@navikt/ds-react";
import { AdapterFilter } from "./AdapterFilter";
import { AdapterTable } from "./AdapterTable";
import { PageHeader } from "../layout/PageHeader";
import type { IAdaptereData, IAdaptereTableRow } from "~/types";

interface AdapterePageProps {
  initialData: IAdaptereData[];
  env: string;
}

export function AdapterePage({ initialData, env }: AdapterePageProps) {
  const [sortState, setSortState] = useState<
    { orderBy: string; direction: "ascending" | "descending" } | undefined
  >(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [statusFilter, setStatusFilter] = useState<{
    ok: boolean;
    error: boolean;
  }>({ ok: true, error: true });
  const [organisasjonFilter, setOrganisasjonFilter] = useState<string>("");
  const [domeneFilter, setDomeneFilter] = useState<string>("");

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
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleOrganisasjonFilterChange = (value: string) => {
    setOrganisasjonFilter(value);
    setCurrentPage(1);
  };

  const handleDomeneFilterChange = (value: string) => {
    setDomeneFilter(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setStatusFilter({ ok: true, error: true });
    setOrganisasjonFilter("");
    setDomeneFilter("");
    setCurrentPage(1);
  };

  const tableData: IAdaptereTableRow[] = initialData.flatMap((adapterData) =>
    Object.entries(adapterData).flatMap(([organisation, orgData]) =>
      Object.entries(orgData).map(([domain, domainData]) => ({
        organisation,
        domain,
        components: domainData.component,
        status: domainData.component.some((comp) => comp.healthy === "HEALTHY") ? "ok" : "error",
      }))
    )
  );

  const filteredData = tableData.filter((item) => {
    if (!statusFilter[item.status as keyof typeof statusFilter]) {
      return false;
    }

    if (
      organisasjonFilter &&
      !item.organisation.toLowerCase().includes(organisasjonFilter.toLowerCase())
    ) {
      return false;
    }

    return !(domeneFilter && !item.domain.toLowerCase().includes(domeneFilter.toLowerCase()));
  });

  const uniqueOrganisasjoner = [...new Set(tableData.map((item) => item.organisation))];
  const uniqueDomener = [...new Set(tableData.map((item) => item.domain))];

  const sortedFilteredData = [...filteredData].sort((a, b) => {
    if (!sortState) return 0;

    const aValue = a[sortState.orderBy as keyof typeof a];
    const bValue = b[sortState.orderBy as keyof typeof b];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortState.direction === "ascending"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Adaptere", href: "/adaptere" },
  ];

  return (
    <Box padding="8" paddingBlock="2">
      <PageHeader
        title="Adaptere"
        description="Oversikt over adaptere og deres status i Fint Core systemet."
        env={env}
        breadcrumbItems={breadcrumbItems}
      />

      <AdapterFilter
        statusFilter={statusFilter}
        organisasjonFilter={organisasjonFilter}
        domeneFilter={domeneFilter}
        uniqueOrganisasjoner={uniqueOrganisasjoner}
        uniqueDomener={uniqueDomener}
        onStatusFilterChange={handleStatusFilterChange}
        onOrganisasjonFilterChange={handleOrganisasjonFilterChange}
        onDomeneFilterChange={handleDomeneFilterChange}
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
