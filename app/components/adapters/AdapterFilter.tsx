import { Box, Button, Checkbox, CheckboxGroup, DatePicker, ExpansionCard, HStack, Select, useRangeDatepicker } from "@navikt/ds-react";
import { FunnelIcon } from "@navikt/aksel-icons";
import React from "react";

interface AdaptereFilterProps {
  // statusFilter: { ok: boolean; error: boolean };
  heartbeatFilter: { active: boolean; inactive: boolean };
  organisationFilter: string;
  domainFilter: string;
  dateRange: { from?: Date; to?: Date } | undefined;
  uniqueOrganisations: string[];
  uniqueDomains: string[];
  onStatusFilterChange: (filter: { ok: boolean; error: boolean }) => void;
  onHeartbeatFilterChange: (filter: { active: boolean; inactive: boolean }) => void;
  onOrganisationFilterChange: (value: string) => void;
  onDomainFilterChange: (value: string) => void;
  onDateRangeChange: (dateRange: { from?: Date; to?: Date } | undefined) => void;
  onClearFilters: () => void;
}

export function AdapterFilter({
  // statusFilter,
  heartbeatFilter,
  organisationFilter,
  domainFilter,
  dateRange,
  uniqueOrganisations,
  uniqueDomains,
  onStatusFilterChange,
  onHeartbeatFilterChange,
  onOrganisationFilterChange,
  onDomainFilterChange,
  onDateRangeChange,
  onClearFilters,
}: AdaptereFilterProps) {
  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    fromDate: new Date("2020-01-01"),
    toDate: new Date("2030-12-31"),
    onRangeChange: (value) => {
      onDateRangeChange({
        from: value?.from,
        to: value?.to,
      });
    },
    defaultSelected: dateRange ? { from: dateRange.from, to: dateRange.to } : undefined,
  });

  const handleClearFilters = () => {
    // Clear date picker inputs
    fromInputProps.onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    toInputProps.onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    // Let parent handle clearing all filter state
    onClearFilters();
  };
  return (
    <Box marginBlock="space-16">
      <ExpansionCard aria-label="Filtrer adaptere" size="small">
        <ExpansionCard.Header>
          <Box className="flex items-center gap-2">
            <FunnelIcon aria-hidden fontSize="1.5rem" />
            <Box>
              <ExpansionCard.Title size="small">Filtrer</ExpansionCard.Title>
            </Box>
          </Box>
        </ExpansionCard.Header>
        <ExpansionCard.Content>
          <Box className="space-y-6">
            {/* Select Filters Row */}
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Organisation Filter */}
              <Box>
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
              </Box>

              {/* Domain Filter */}
              <Box>
                <Select size="small" label="Domene" value={domainFilter} onChange={(e) => onDomainFilterChange(e.target.value)} id="domain-filter" data-cy="domain-filter">
                  <option value="">Alle domener</option>
                  {uniqueDomains.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </Select>
              </Box>
            </Box>

            {/* Date Range and Heartbeat Filters Row */}
            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Box>
                <DatePicker {...datepickerProps}>
                  <HStack gap="4">
                    <DatePicker.Input {...fromInputProps} label="full synk fra dato" size="small" />
                    <DatePicker.Input {...toInputProps} label="til dato" size="small" />
                  </HStack>
                </DatePicker>
              </Box>
              {/* Heartbeat Filter */}
              <Box>
                <CheckboxGroup
                  legend="Heartbeat"
                  size="small"
                  value={Object.entries(heartbeatFilter)
                    .filter(([, value]) => value)
                    .map(([key]) => key)}
                  onChange={(values: string[]) => {
                    onHeartbeatFilterChange({
                      active: values.includes("active"),
                      inactive: values.includes("inactive"),
                    });
                  }}
                >
                  <Checkbox value="active">Aktiv</Checkbox>
                  <Checkbox value="inactive">Inaktiv</Checkbox>
                </CheckboxGroup>
              </Box>
            </Box>

            {/* Clear Filters Button */}
            <Box>
              <Button variant="tertiary" size="small" onClick={handleClearFilters}>
                Tøm filtre
              </Button>
            </Box>
          </Box>
        </ExpansionCard.Content>
      </ExpansionCard>
    </Box>
  );
}
