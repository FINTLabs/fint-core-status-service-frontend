import { Box, Checkbox, Select, Fieldset, Heading, HGrid } from "@navikt/ds-react";

interface AdaptereFilterProps {
  statusFilter: { ok: boolean; error: boolean };
  organisasjonFilter: string;
  domeneFilter: string;
  uniqueOrganisasjoner: string[];
  uniqueDomener: string[];
  onStatusFilterChange: (filter: { ok: boolean; error: boolean }) => void;
  onOrganisasjonFilterChange: (value: string) => void;
  onDomeneFilterChange: (value: string) => void;
}

export function AdaptereFilter({
  statusFilter,
  organisasjonFilter,
  domeneFilter,
  uniqueOrganisasjoner,
  uniqueDomener,
  onStatusFilterChange,
  onOrganisasjonFilterChange,
  onDomeneFilterChange,
}: AdaptereFilterProps) {
  return (
    <Box
      background="surface-default"
      padding="space-16"
      borderRadius="medium"
      shadow="xsmall"
      marginBlock="space-32"
    >

      
      <HGrid columns={{ sm: 1, md: 3 }} gap="space-16">
        {/* Status Filter */}
        <Fieldset legend="Status" size="small">
          <HGrid columns={{ sm: 1, md: 2 }} gap="space-16">
            <Checkbox
              size="small"
              checked={statusFilter.ok}
              onChange={(e) => onStatusFilterChange({ ...statusFilter, ok: e.target.checked })}
            >
              Aktiv
            </Checkbox>
            <Checkbox
              size="small"
              checked={statusFilter.error}
              onChange={(e) => onStatusFilterChange({ ...statusFilter, error: e.target.checked })}
            >
              Inaktiv
            </Checkbox>
          </HGrid>
        </Fieldset>

        {/* Organisasjon Filter */}
        <Select
          size="small"
          label="Organisasjon"
          value={organisasjonFilter}
          onChange={(e) => onOrganisasjonFilterChange(e.target.value)}
        >
          <option value="">Alle organisasjoner</option>
          {uniqueOrganisasjoner.map(org => (
            <option key={org} value={org}>{org}</option>
          ))}
        </Select>

        {/* Domene Filter */}
        <Select
          size="small"
          label="Domene"
          value={domeneFilter}
          onChange={(e) => onDomeneFilterChange(e.target.value)}
        >
          <option value="">Alle domener</option>
          {uniqueDomener.map(domene => (
            <option key={domene} value={domene}>{domene}</option>
          ))}
        </Select>
      </HGrid>
    </Box>
  );
}
