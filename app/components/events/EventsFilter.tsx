import { Box, Button, Checkbox, CheckboxGroup, DatePicker, ExpansionCard, HGrid, HStack, Search, Select, useRangeDatepicker, VStack } from "@navikt/ds-react";
import { FunnelIcon } from "@navikt/aksel-icons";
import React from "react";

interface EventsFilterProps {
  searchFilter: string;
  dateRange: { from?: Date; to?: Date } | undefined;
  operationFilter: {
    CREATE: boolean;
    UPDATE: boolean;
    DELETE: boolean;
    VALIDATE: boolean;
  };
  orgFilter: string;
  resourceFilter: string;
  statusFilter: {
    ok: boolean;
    error: boolean;
  };
  uniqueOrg: string[];
  uniqueResource: string[];
  onSearchFilterChange: (value: string) => void;
  onDateRangeChange: (dateRange: { from?: Date; to?: Date } | undefined) => void;
  onOperationFilterChange: (value: { CREATE: boolean; UPDATE: boolean; DELETE: boolean; VALIDATE: boolean }) => void;
  onOrgFilterChange: (value: string) => void;
  onResourceFilterChange: (value: string) => void;
  onStatusFilterChange: (value: { ok: boolean; error: boolean }) => void;
  onClearFilters: () => void;
}

export function EventsFilter({
  searchFilter,
  dateRange,
  operationFilter,
  orgFilter,
  resourceFilter,
  statusFilter,
  uniqueOrg,
  uniqueResource,
  onSearchFilterChange,
  onDateRangeChange,
  onOperationFilterChange,
  onOrgFilterChange,
  onResourceFilterChange,
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
    <ExpansionCard aria-label="Filtrer hendelser" size="small" className="mb-4">
      <ExpansionCard.Header>
        <HStack gap="2">
          <FunnelIcon aria-hidden fontSize="1.5rem" />
          <ExpansionCard.Title size="small">Filtrer</ExpansionCard.Title>
        </HStack>
      </ExpansionCard.Header>
      <ExpansionCard.Content>
        {/* Search Filter */}
        <VStack gap="4">
          <Search label="Søk hendelser" value={searchFilter} onChange={onSearchFilterChange} placeholder="Søk hendelser..." variant="secondary" size="small" />
          <HGrid gap="space-24" columns={2}>
            <Select label="Organisasjon" size="small" value={orgFilter} onChange={(e) => onOrgFilterChange(e.target.value)} id="organisation-filter">
              <option value="">Alle organisasjoner</option>
              {uniqueOrg.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </Select>
            <Select label="Ressurser" size="small" value={resourceFilter} onChange={(e) => onResourceFilterChange(e.target.value)} id="resource-filter">
              <option value="">Alle ressurser</option>
              {uniqueResource.map((ressurs) => (
                <option key={ressurs} value={ressurs}>
                  {ressurs}
                </option>
              ))}
            </Select>
          </HGrid>

          {/* Operation Type Filter */}
          <CheckboxGroup
            legend="Operasjon"
            size="small"
            value={Object.entries(operationFilter)
              .filter(([, value]) => value)
              .map(([key]) => key)}
            onChange={(values: string[]) => {
              onOperationFilterChange({
                CREATE: values.includes("CREATE"),
                UPDATE: values.includes("UPDATE"),
                DELETE: values.includes("DELETE"),
                VALIDATE: values.includes("VALIDATE"),
              });
            }}
          >
            <Checkbox value="CREATE">CREATE</Checkbox>
            <Checkbox value="UPDATE">UPDATE</Checkbox>
            <Checkbox value="DELETE">DELETE</Checkbox>
            <Checkbox value="VALIDATE">VALIDATE</Checkbox>
          </CheckboxGroup>

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
  );
}
