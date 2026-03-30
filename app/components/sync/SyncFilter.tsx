import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  ExpansionCard,
  HGrid,
  HStack,
  Select,
  TextField,
  useRangeDatepicker,
  VStack,
} from "@navikt/ds-react";
import { FunnelIcon } from "@navikt/aksel-icons";
import {
  applyTimeToDate,
  createLast30DaysDisabledDays,
  formatTimeValue,
} from "~/utils/time";

interface SyncFilterProps {
  filters: {
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
  };
  uniqueOrg: string[];
  uniqueDomain: string[];
  uniquePacker: string[];
  uniqueResource: string[];
  onApplyFilters: (value: SyncFilterProps["filters"]) => void;
  onClearFilters: () => void;
}

export function SyncFilter({
  filters,
  uniqueOrg,
  uniqueDomain,
  uniquePacker,
  uniqueResource,
  onApplyFilters,
  onClearFilters,
}: SyncFilterProps) {
  const [syncTypeFilter, setSyncTypeFilter] = useState(filters.syncTypeFilter);
  const [statusFilter, setStatusFilter] = useState(filters.statusFilter);
  const [orgFilter, setOrgFilter] = useState(filters.orgFilter);
  const [domainFilter, setDomainFilter] = useState(filters.domainFilter);
  const [packageFilter, setPackageFilter] = useState(filters.packageFilter);
  const [resourceFilter, setResourceFilter] = useState(filters.resourceFilter);
  const [dateRange, setDateRange] = useState(filters.dateRange);
  const [fromTime, setFromTime] = useState(
    formatTimeValue(filters.dateRange.from),
  );
  const [toTime, setToTime] = useState(formatTimeValue(filters.dateRange.to));

  useEffect(() => {
    setSyncTypeFilter(filters.syncTypeFilter);
    setStatusFilter(filters.statusFilter);
    setOrgFilter(filters.orgFilter);
    setDomainFilter(filters.domainFilter);
    setPackageFilter(filters.packageFilter);
    setResourceFilter(filters.resourceFilter);
    setDateRange(filters.dateRange);
    setFromTime(formatTimeValue(filters.dateRange.from));
    setToTime(formatTimeValue(filters.dateRange.to));
  }, [filters]);
  const disabledDays = createLast30DaysDisabledDays();
  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    onRangeChange: (value) => {
      setDateRange({
        from: value?.from,
        to: value?.to,
      });
    },
    defaultSelected: dateRange.from || dateRange.to ? dateRange : undefined,
    disabled: disabledDays,
  });

  const handleClearFilters = () => {
    // Let parent handle clearing all filter state
    onClearFilters();
  };

  return (
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
              onChange={(e) => setOrgFilter(e.target.value)}
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
              onChange={(e) => setDomainFilter(e.target.value)}
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
              onChange={(e) => setPackageFilter(e.target.value)}
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
              onChange={(e) => setResourceFilter(e.target.value)}
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
            <CheckboxGroup
              // data-color={"brand-magenta"}
              legend="Synkroniseringstype"
              size="small"
              value={Object.entries(syncTypeFilter)
                .filter(([, value]) => value)
                .map(([key]) => key)}
              onChange={(values: string[]) => {
                setSyncTypeFilter({
                  full: values.includes("full"),
                  delta: values.includes("delta"),
                });
              }}
            >
              <Checkbox value="full">Full</Checkbox>
              <Checkbox value="delta">Delta</Checkbox>
            </CheckboxGroup>
            <CheckboxGroup
              legend="Status"
              size="small"
              value={Object.entries(statusFilter)
                .filter(([, value]) => value)
                .map(([key]) => key)}
              onChange={(values: string[]) => {
                setStatusFilter({
                  finished: values.includes("finished"),
                  ongoing: values.includes("ongoing"),
                });
              }}
            >
              <Checkbox value="finished">Fullført</Checkbox>
              <Checkbox value="ongoing">Pågår</Checkbox>
            </CheckboxGroup>

            <DatePicker
              key={`${dateRange.from?.getTime() ?? "none"}-${dateRange.to?.getTime() ?? "none"}`}
              {...datepickerProps}
            >
              <HGrid columns={2} gap="space-24">
                <DatePicker.Input
                  {...fromInputProps}
                  label="Fra dato"
                  size="small"
                />
                <TextField
                  label="Fra tid"
                  size="small"
                  type="time"
                  value={fromTime}
                  onChange={(event) => setFromTime(event.target.value)}
                />
                <DatePicker.Input
                  {...toInputProps}
                  label="Til dato"
                  size="small"
                />
                <TextField
                  label="Til tid"
                  size="small"
                  type="time"
                  value={toTime}
                  onChange={(event) => setToTime(event.target.value)}
                />
              </HGrid>
            </DatePicker>
          </HGrid>
          <HStack justify="space-between">
            <Button
              variant="tertiary"
              size="small"
              onClick={handleClearFilters}
              // data-color={"brand-magenta"}
            >
              Tøm filtre
            </Button>
            <Button
              size="small"
              variant="tertiary"
              icon={<FunnelIcon aria-hidden />}
              onClick={() => {
                const appliedDateRange = {
                  from: applyTimeToDate(dateRange.from, fromTime, false),
                  to: applyTimeToDate(dateRange.to, toTime, true),
                };

                onApplyFilters({
                  syncTypeFilter,
                  statusFilter,
                  orgFilter,
                  domainFilter,
                  packageFilter,
                  resourceFilter,
                  dateRange: appliedDateRange,
                });
              }}
            >
              Bruk filter
            </Button>
          </HStack>
        </VStack>
      </ExpansionCard.Content>
    </ExpansionCard>
  );
}
