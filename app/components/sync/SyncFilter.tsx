import {
  Checkbox,
  CheckboxGroup,
  DatePicker,
  ExpansionCard,
  HGrid,
  HStack,
  Select,
  useRangeDatepicker,
  VStack,
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
  orgFilter: string;
  domainFilter: string;
  packageFilter: string;
  resourceFilter: string;
  dateRange: { from: Date | undefined; to: Date | undefined };
  uniqueOrg: string[];
  uniqueDomain: string[];
  uniquePacker: string[];
  uniqueResource: string[];
  onSyncTypeFilterChange: (value: { full: boolean; delta: boolean }) => void;
  onStatusFilterChange: (value: {
    finished: boolean;
    ongoing: boolean;
  }) => void;
  onOrgFilterChange: (value: string) => void;
  onDomainFilterChange: (value: string) => void;
  onPackageFilterChange: (value: string) => void;
  onResourceFilterChange: (value: string) => void;
  onDateRangeChange: (value: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
  onClearFilters: () => void;
}

export function SyncFilter({
  syncTypeFilter,
  statusFilter,
  orgFilter,
  domainFilter,
  packageFilter,
  resourceFilter,
  dateRange,
  uniqueOrg,
  uniqueDomain,
  uniquePacker,
  uniqueResource,
  onSyncTypeFilterChange,
  onStatusFilterChange,
  onOrgFilterChange,
  onDomainFilterChange,
  onPackageFilterChange,
  onResourceFilterChange,
  onDateRangeChange,
  onClearFilters: _onClearFilters,
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
    // <Box className="mb-4">
    // </Box>
    <ExpansionCard aria-label="Filtrer synkroniseringer" size="small">
      <ExpansionCard.Header>
        <HStack gap="space-8">
          <FunnelIcon aria-hidden fontSize="1.5rem" />
          <ExpansionCard.Title size="small">Filtrer</ExpansionCard.Title>
        </HStack>
      </ExpansionCard.Header>
      <ExpansionCard.Content>
        <VStack gap="space-16">
          <HGrid columns={4} gap="space-24">
            <Select
              label="Organisasjon"
              size="small"
              value={orgFilter}
              onChange={(e) => onOrgFilterChange(e.target.value)}
              id="organisation-filter"
            >
              <option value="">Alle organisasjoner</option>
              {uniqueOrg.map((org) => (
                <option key={org} value={org}>
                  {org}
                </option>
              ))}
            </Select>

            <Select
              label="Domene"
              size="small"
              value={domainFilter}
              onChange={(e) => onDomainFilterChange(e.target.value)}
              id="domain-filter"
            >
              <option value="">Alle domener</option>
              {uniqueDomain.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </Select>

            <Select
              label="Pakke"
              size="small"
              value={packageFilter}
              onChange={(e) => onPackageFilterChange(e.target.value)}
              id="package-filter"
            >
              <option value="">Alle pakker</option>
              {uniquePacker.map((pakke) => (
                <option key={pakke} value={pakke}>
                  {pakke}
                </option>
              ))}
            </Select>

            <Select
              label="Ressurs"
              size="small"
              value={resourceFilter}
              onChange={(e) => onResourceFilterChange(e.target.value)}
              id="resource-filter"
            >
              <option value="">Alle ressurser</option>
              {uniqueResource.map((resource: string) => (
                <option key={resource} value={resource}>
                  {resource}
                </option>
              ))}
            </Select>
          </HGrid>
          <HGrid columns={3} gap="space-24">
            {" "}
            <CheckboxGroup
              // data-color={"brand-magenta"}
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
            <CheckboxGroup
              // data-color={"brand-magenta"}
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
            <DatePicker {...datepickerProps}>
              <DatePicker.Input
                {...fromInputProps}
                label="Fra dato"
                size="small"
              />
              <DatePicker.Input
                {...toInputProps}
                label="Til dato"
                size="small"
              />
            </DatePicker>
          </HGrid>
        </VStack>
      </ExpansionCard.Content>
    </ExpansionCard>
  );
}
