import { Box, Button, Checkbox, CheckboxGroup, Select } from "@navikt/ds-react";

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
  uniqueOrganisasjoner: string[];
  uniqueDomener: string[];
  onSyncTypeFilterChange: (value: { full: boolean; delta: boolean }) => void;
  onStatusFilterChange: (value: { finished: boolean; ongoing: boolean }) => void;
  onOrganisasjonFilterChange: (value: string) => void;
  onDomeneFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

export function SyncFilter({
  syncTypeFilter,
  statusFilter,
  organisasjonFilter,
  domeneFilter,
  uniqueOrganisasjoner,
  uniqueDomener,
  onSyncTypeFilterChange,
  onStatusFilterChange,
  onOrganisasjonFilterChange,
  onDomeneFilterChange,
  onClearFilters,
}: SyncFilterProps) {
  return (
    <Box padding="space-16" borderRadius="large" className="mb-4">
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

      {/* Clear Filters Button */}
      <div className="mt-4">
        <Button variant="tertiary" size="small" onClick={onClearFilters}>
          Tøm filtre
        </Button>
      </div>
    </Box>
  );
}
