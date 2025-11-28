import { Box, Button, Checkbox, CheckboxGroup, DatePicker, ExpansionCard, HGrid, HStack, Search, Select, useRangeDatepicker, VStack } from "@navikt/ds-react";
import { FunnelIcon } from "@navikt/aksel-icons";
import React from "react";

interface EventsFilterProps {
  searchFilter: string;
  dateRange: { from?: Date; to?: Date } | undefined;
  operationFilter: string;
  organisasjonFilter: string;
  ressursFilter: string;
  statusFilter: {
    ok: boolean;
    error: boolean;
  };
  uniqueOperations: string[];
  uniqueOrganisasjoner: string[];
  uniqueRessurser: string[];
  onSearchFilterChange: (value: string) => void;
  onDateRangeChange: (dateRange: { from?: Date; to?: Date } | undefined) => void;
  onOperationFilterChange: (value: string) => void;
  onOrganisasjonFilterChange: (value: string) => void;
  onRessursFilterChange: (value: string) => void;
  onStatusFilterChange: (value: { ok: boolean; error: boolean }) => void;
  onClearFilters: () => void;
}

export function EventsFilter({
  searchFilter,
  dateRange,
  operationFilter,
  organisasjonFilter,
  ressursFilter,
  statusFilter,
  uniqueOperations,
  uniqueOrganisasjoner,
  uniqueRessurser,
  onSearchFilterChange,
  onDateRangeChange,
  onOperationFilterChange,
  onOrganisasjonFilterChange,
  onRessursFilterChange,
  onStatusFilterChange,
  onClearFilters,
}: EventsFilterProps) {
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
    <Box className="mb-4">
      <ExpansionCard aria-label="Filtrer hendelser" size="small">
        <ExpansionCard.Header>
          <HStack gap="2">
            <FunnelIcon aria-hidden fontSize="1.5rem" />
            <ExpansionCard.Title size="small">Filtrer</ExpansionCard.Title>
          </HStack>
        </ExpansionCard.Header>
        <ExpansionCard.Content>
          {/* Search Filter */}
          <VStack gap="2">
            <Search label="Søk hendelser" value={searchFilter} onChange={onSearchFilterChange} placeholder="Søk hendelser..." variant="secondary" size="small" />
            <HGrid gap="space-24" columns={3}>
              <Select label="Operasjon" size="small" value={operationFilter} onChange={(e) => onOperationFilterChange(e.target.value)} id="operation-filter">
                <option value="">Alle operasjoner</option>
                {uniqueOperations.map((operation) => (
                  <option key={operation} value={operation}>
                    {operation}
                  </option>
                ))}
              </Select>
              <Select label="Organisasjon" size="small" value={organisasjonFilter} onChange={(e) => onOrganisasjonFilterChange(e.target.value)} id="organisation-filter">
                <option value="">Alle organisasjoner</option>
                {uniqueOrganisasjoner.map((org) => (
                  <option key={org} value={org}>
                    {org}
                  </option>
                ))}
              </Select>
              <Select label="Ressurser" size="small" value={ressursFilter} onChange={(e) => onRessursFilterChange(e.target.value)} id="resource-filter">
                <option value="">Alle ressurser</option>
                {uniqueRessurser.map((ressurs) => (
                  <option key={ressurs} value={ressurs}>
                    {ressurs}
                  </option>
                ))}
              </Select>
            </HGrid>

            {/* Date Range and Status Filter Row */}
            <HGrid gap="space-24" columns={2}>
              {/* Date Range Filter */}
              <DatePicker {...datepickerProps}>
                <DatePicker.Input {...fromInputProps} label="Fra dato" size="small" />
                <DatePicker.Input {...toInputProps} label="Til dato" size="small" />
              </DatePicker>

              {/* Status Filter */}
              <CheckboxGroup
                legend="Status"
                size="small"
                value={Object.entries(statusFilter)
                  .filter(([, value]) => value)
                  .map(([key]) => key)}
                onChange={(values: string[]) => {
                  onStatusFilterChange({
                    ok: values.includes("ok"),
                    error: values.includes("error"),
                  });
                }}
              >
                <Checkbox value="ok">OK</Checkbox>
                <Checkbox value="error">Feil</Checkbox>
              </CheckboxGroup>
            </HGrid>

            {/* Clear Filters Button */}
            <Box>
              <Button variant="tertiary" size="small" onClick={handleClearFilters}>
                Tøm filtre
              </Button>
            </Box>
          </VStack>
        </ExpansionCard.Content>
      </ExpansionCard>
    </Box>
  );
}
