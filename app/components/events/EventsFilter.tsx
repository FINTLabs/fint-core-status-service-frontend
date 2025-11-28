import {
  Button,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  ExpansionCard,
  Search,
  Select,
  useRangeDatepicker,
} from "@navikt/ds-react";
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
    <div className="mb-4">
      <ExpansionCard aria-label="Filtrer hendelser" size="small">
        <ExpansionCard.Header>
          <div className="flex items-center gap-2">
            <FunnelIcon aria-hidden fontSize="1.5rem" />
            <div>
              <ExpansionCard.Title size="small">Filtrer</ExpansionCard.Title>
            </div>
          </div>
        </ExpansionCard.Header>
        <ExpansionCard.Content>
          <div className="space-y-6">
            {/* Search Filter */}
            <div>
              <Search
                label="Søk hendelser"
                value={searchFilter}
                onChange={onSearchFilterChange}
                placeholder="Søk hendelser..."
                variant="secondary"
                size="small"
              />
            </div>

            {/* Select Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Operation Filter */}
              <div>
                <Select
                  label="Operasjon"
                  size="small"
                  value={operationFilter}
                  onChange={(e) => onOperationFilterChange(e.target.value)}
                  id="operation-filter"
                >
                  <option value="">Alle operasjoner</option>
                  {uniqueOperations.map((operation) => (
                    <option key={operation} value={operation}>
                      {operation}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Organisation Filter */}
              <div>
                <Select
                  label="Organisasjon"
                  size="small"
                  value={organisasjonFilter}
                  onChange={(e) => onOrganisasjonFilterChange(e.target.value)}
                  id="organisation-filter"
                >
                  <option value="">Alle organisasjoner</option>
                  {uniqueOrganisasjoner.map((org) => (
                    <option key={org} value={org}>
                      {org}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Resource Filter */}
              <div>
                <Select
                  label="Ressurser"
                  size="small"
                  value={ressursFilter}
                  onChange={(e) => onRessursFilterChange(e.target.value)}
                  id="resource-filter"
                >
                  <option value="">Alle ressurser</option>
                  {uniqueRessurser.map((ressurs) => (
                    <option key={ressurs} value={ressurs}>
                      {ressurs}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Date Range and Status Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* Date Range Filter */}
              <div className="md:col-span-2">
                <DatePicker {...datepickerProps}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DatePicker.Input {...fromInputProps} label="Fra dato" size="small" />
                    <DatePicker.Input {...toInputProps} label="Til dato" size="small" />
                  </div>
                </DatePicker>
              </div>

              {/* Status Filter */}
              <div>
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
              </div>
            </div>

            {/* Clear Filters Button */}
            <div>
              <Button variant="tertiary" size="small" onClick={handleClearFilters}>
                Tøm filtre
              </Button>
            </div>
          </div>
        </ExpansionCard.Content>
      </ExpansionCard>
    </div>
  );
}
