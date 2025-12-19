import { useMemo, useState } from "react";
import { Box } from "@navikt/ds-react";
import { AdapterFilter } from "./AdapterFilter";
import { AdapterCards } from "./AdapterCards";
import type { IContractStatus } from "~/types";
import { useNavigate } from "react-router";

interface AdapterPageProps {
  initialData: IContractStatus[];
}

export function AdapterPage({ initialData }: AdapterPageProps) {
  const nav = useNavigate();

  const [heartbeatFilter, setHeartbeatFilter] = useState<{
    active: boolean;
    inactive: boolean;
  }>({ active: true, inactive: true });
  const [organisationFilter, setOrganisationFilter] = useState<string>("");
  const [domainFilter, setDomainFilter] = useState<string>("");

  function handleCardClick(item: IContractStatus) {
    nav(`/adaptere/${item.organzation}/${item.domain}`);
  }

  const handleHeartbeatFilterChange = (value: { active: boolean; inactive: boolean }) => {
    setHeartbeatFilter(value);
  };

  const handleOrganisationFilterChange = (value: string) => {
    setOrganisationFilter(value);
  };

  const handleDomainFilterChange = (value: string) => {
    setDomainFilter(value);
  };

  const handleClearFilters = () => {
    setHeartbeatFilter({ active: true, inactive: true });
    setOrganisationFilter("");
    setDomainFilter("");
  };

  const tableData: IContractStatus[] = useMemo(() => {
    return initialData || [];
  }, [initialData]);

  const uniqueOrganisations = useMemo(() => {
    return [...new Set((initialData || []).map((adapter) => adapter.organzation))].sort();
  }, [initialData]);

  const uniqueDomains = useMemo(() => {
    return [...new Set((initialData || []).map((adapter) => adapter.domain))].sort();
  }, [initialData]);

  const filteredData = useMemo(() => {
    const filtered = tableData.filter((item) => {
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

    // Sort so errors (heartBeat: false) appear first
    return [...filtered].sort((a, b) => {
      // If one has error and the other doesn't, error comes first
      if (!a.heartBeat && b.heartBeat) return -1;
      if (a.heartBeat && !b.heartBeat) return 1;
      // If both have same status, maintain original order (or sort by organization/domain)
      return 0;
    });
  }, [tableData, organisationFilter, domainFilter, heartbeatFilter]);

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

      <AdapterCards data={filteredData} onCardClick={handleCardClick} />
    </Box>
  );
}
