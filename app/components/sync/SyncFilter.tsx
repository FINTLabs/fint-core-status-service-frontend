import {
  Button,
  Checkbox,
  CheckboxGroup,
  Select,
  DatePicker,
  useRangeDatepicker,
  ExpansionCard,
} from "@navikt/ds-react";
import { FunnelIcon } from "@navikt/aksel-icons";

interface SyncFilterProps {
  syncTypeFilter: {
    full: boolean;
    delta: boolean;
  };
  statusFilter: {
    finished: boolean;
    ongoing: boolean;
  };
  organisasjonFilter: string;
  domeneFilter: string;
  dateRange: { from: Date | undefined; to: Date | undefined };
  uniqueOrganisasjoner: string[];
  uniqueDomener: string[];
  onSyncTypeFilterChange: (value: { full: boolean; delta: boolean }) => void;
  onStatusFilterChange: (value: { finished: boolean; ongoing: boolean }) => void;
  onOrganisasjonFilterChange: (value: string) => void;
  onDomeneFilterChange: (value: string) => void;
  onDateRangeChange: (value: { from: Date | undefined; to: Date | undefined }) => void;
  onClearFilters: () => void;
}

export function SyncFilter({
  syncTypeFilter,
  statusFilter,
  organisasjonFilter,
  domeneFilter,
  dateRange,
  uniqueOrganisasjoner,
  uniqueDomener,
  onSyncTypeFilterChange,
  onStatusFilterChange,
  onOrganisasjonFilterChange,
  onDomeneFilterChange,
  onDateRangeChange,
  onClearFilters,
}: SyncFilterProps) {
  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    onRangeChange: (value) => {
      onDateRangeChange({
        from: value?.from,
        to: value?.to,
      });
    },
    defaultSelected: dateRange.from && dateRange.to ? dateRange : undefined,
  });

  return (
    <div className="mb-4">
      <ExpansionCard aria-label="Filtrer synkroniseringer" size="small">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Sync Type Filter */}
              <div>
                <CheckboxGroup
                  legend="Synkroniseringstype"
                  size="small"
                  value={Object.entries(syncTypeFilter)
                    .filter(([, value]) => value)
                    .map(([key]) => key)}
                  onChange={(values: string[]) => {
                    onSyncTypeFilterChange({
                      full: values.includes("full"),
                      delta: values.includes("delta"),
                    });
                  }}
                >
                  <Checkbox value="full">Full</Checkbox>
                  <Checkbox value="delta">Delta</Checkbox>
                </CheckboxGroup>
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
                      finished: values.includes("finished"),
                      ongoing: values.includes("ongoing"),
                    });
                  }}
                >
                  <Checkbox value="finished">Fullført</Checkbox>
                  <Checkbox value="ongoing">Pågår</Checkbox>
                </CheckboxGroup>
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

              {/* Domain Filter */}
              <div>
                <Select
                  label="Domene"
                  size="small"
                  value={domeneFilter}
                  onChange={(e) => onDomeneFilterChange(e.target.value)}
                  id="domain-filter"
                >
                  <option value="">Alle domener</option>
                  {uniqueDomener.map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Date Range Filter */}
            <div>
              <DatePicker {...datepickerProps}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DatePicker.Input {...fromInputProps} label="Fra dato" size="small" />
                  <DatePicker.Input {...toInputProps} label="Til dato" size="small" />
                </div>
              </DatePicker>
            </div>

            {/* Clear Filters Button */}
            <div>
              <Button variant="tertiary" size="small" onClick={onClearFilters}>
                Tøm filtre
              </Button>
            </div>
          </div>
        </ExpansionCard.Content>
      </ExpansionCard>
    </div>
  );
}
