import { Box, Button, Checkbox, CheckboxGroup, ExpansionCard, HGrid, HStack, Select, VStack } from "@navikt/ds-react";
import { FunnelIcon } from "@navikt/aksel-icons";
import React from "react";

interface AdaptereFilterProps {
  statusFilter: Record<string, boolean>;
  organisationFilter: string;
  domainFilter: string;
  uniqueStatuses: string[];
  uniqueOrganisations: string[];
  uniqueDomains: string[];
  onStatusFilterChange: (filter: Record<string, boolean>) => void;
  onOrganisationFilterChange: (value: string) => void;
  onDomainFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

export function AdapterFilter({
  statusFilter,
  organisationFilter,
  domainFilter,
  uniqueStatuses,
  uniqueOrganisations,
  uniqueDomains,
  onStatusFilterChange,
  onOrganisationFilterChange,
  onDomainFilterChange,
  onClearFilters,
}: AdaptereFilterProps) {
  const handleClearFilters = () => {
    // Let parent handle clearing all filter state
    onClearFilters();
  };
  return (
    <ExpansionCard aria-label="Filtrer adaptere" size="small" className="mb-4">
      <ExpansionCard.Header>
        <HStack gap="2">
          <FunnelIcon aria-hidden fontSize="1.5rem" />
          <ExpansionCard.Title size="small">Filtrer</ExpansionCard.Title>
        </HStack>
      </ExpansionCard.Header>
      <ExpansionCard.Content>
        <VStack gap="4">
          {/* Select Filters Row */}
          <HGrid gap="space-24" columns={2}>
            <Select
              size="small"
              label="Organisasjon"
              value={organisationFilter}
              onChange={(e) => onOrganisationFilterChange(e.target.value)}
              id="organisation-filter"
              data-cy="organisation-filter"
            >
              <option value="">Alle organisasjoner</option>
              {uniqueOrganisations.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </Select>

            <Select
              size="small"
              label="Domene"
              value={domainFilter}
              onChange={(e) => onDomainFilterChange(e.target.value)}
              id="domain-filter"
              data-cy="domain-filter"
            >
              <option value="">Alle domener</option>
              {uniqueDomains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </Select>
          </HGrid>

          {/* Status Filter */}
          <CheckboxGroup
            legend="Status"
            size="small"
            value={Object.entries(statusFilter)
              .filter(([, value]) => value)
              .map(([key]) => key)}
            onChange={(values: string[]) => {
              const newFilter: Record<string, boolean> = {};
              uniqueStatuses.forEach((status) => {
                newFilter[status] = values.includes(status);
              });
              onStatusFilterChange(newFilter);
            }}
          >
            {uniqueStatuses.map((status) => (
              <Checkbox key={status} value={status}>
                {status}
              </Checkbox>
            ))}
          </CheckboxGroup>

          {/* Clear Filters Button */}
          <Box>
            <Button variant="tertiary" size="small" onClick={handleClearFilters}>
              Tøm filtre
            </Button>
          </Box>
        </VStack>
      </ExpansionCard.Content>
    </ExpansionCard>
  );
}
