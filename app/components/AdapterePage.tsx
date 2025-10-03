import { useState } from "react";
import { Heading, BodyLong, Box } from "@navikt/ds-react";
import { AdaptereFilter } from "./AdaptereFilter";
import { AdaptereTable } from "./AdaptereTable";
import type { AdaptereData, AdaptereTableRow } from "../types";

interface AdapterePageProps {
  initialData: AdaptereData[];
  env: string;
}

export function AdapterePage({ initialData, env }: AdapterePageProps) {
  // Sort state
  const [sortState, setSortState] = useState<{ orderBy: string; direction: "ascending" | "descending" } | undefined>(undefined);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<{ ok: boolean; error: boolean }>({ ok: true, error: true });
  const [organisasjonFilter, setOrganisasjonFilter] = useState<string>("");
  const [domeneFilter, setDomeneFilter] = useState<string>("");

  const handleSortChange = (sortKey: string) => {
    let newDirection: "ascending" | "descending" = "ascending";
    
    if (sortState?.orderBy === sortKey && sortState?.direction === "ascending") {
      newDirection = "descending";
    }

    const newSortState = { orderBy: sortKey, direction: newDirection };
    setSortState(newSortState);
  };

      // Transform data for table display
      const tableData: AdaptereTableRow[] = initialData.flatMap(adapterData =>
        Object.entries(adapterData).flatMap(([organisation, orgData]) =>
          Object.entries(orgData).map(([domain, domainData]) => ({
            organisation,
            domain,
            components: domainData.component,
            status: domainData.component.some(comp => comp.healthy === "HEALTHY") ? "ok" : "error"
          }))
        )
      );

  // Filter the data based on current filters
  const filteredData = tableData.filter(item => {
    // Status filter
    if (!statusFilter[item.status as keyof typeof statusFilter]) {
      return false;
    }

    // Organisation filter
    if (organisasjonFilter && !item.organisation.toLowerCase().includes(organisasjonFilter.toLowerCase())) {
      return false;
    }

    // Domain filter
    if (domeneFilter && !item.domain.toLowerCase().includes(domeneFilter.toLowerCase())) {
      return false;
    }

    return true;
  });

  // Get unique values for select options
  const uniqueOrganisasjoner = [...new Set(tableData.map(item => item.organisation))];
  const uniqueDomener = [...new Set(tableData.map(item => item.domain))];

  // Apply sorting to filtered data
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

  return (
    <Box padding="8" paddingBlock="2">
      <Box marginBlock="8">
        <Heading size="xlarge" spacing>
          Adaptere : {env}
        </Heading>
        <BodyLong size="large" textColor="subtle">
          Oversikt over adaptere og deres status i Fint Core systemet.
        </BodyLong>
      </Box>

      <AdaptereFilter
        statusFilter={statusFilter}
        organisasjonFilter={organisasjonFilter}
        domeneFilter={domeneFilter}
        uniqueOrganisasjoner={uniqueOrganisasjoner}
        uniqueDomener={uniqueDomener}
        onStatusFilterChange={setStatusFilter}
        onOrganisasjonFilterChange={setOrganisasjonFilter}
        onDomeneFilterChange={setDomeneFilter}
      />

      <AdaptereTable
        data={sortedFilteredData}
        sortState={sortState}
        onSortChange={handleSortChange}
      />
    </Box>
  );
}
