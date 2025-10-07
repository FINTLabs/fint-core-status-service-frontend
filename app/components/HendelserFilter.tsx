import { Box, Button, DatePicker, Fieldset, HStack, Provider, Search, Spacer, useRangeDatepicker } from "@navikt/ds-react";
import React from "react";

interface HendelserFilterProps {
  searchFilter: string;
  dateRange: { from?: Date; to?: Date } | undefined;
  onSearchFilterChange: (value: string) => void;
  onDateRangeChange: (dateRange: { from?: Date; to?: Date } | undefined) => void;
  onClearFilters: () => void;
}

export function HendelserFilter({
  searchFilter,
  dateRange,
  onSearchFilterChange,
  onDateRangeChange,
}: HendelserFilterProps) {
  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    fromDate: new Date("2020-01-01"),
    toDate: new Date("2030-12-31"),
    onRangeChange: onDateRangeChange,
    defaultSelected: dateRange ? { from: dateRange.from, to: dateRange.to } : undefined,
  });

  // Clear filters including datepicker state
  const handleClearFilters = () => {
    onSearchFilterChange("");
    onDateRangeChange(undefined);
    // Reset the datepicker inputs
    fromInputProps.onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    toInputProps.onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Box
      background="surface-default"
      padding="space-16"
      borderRadius="medium"
      shadow="xsmall"
      marginBlock="space-32"
    >
      <HStack gap="space-16" align="center" wrap={false}>
        {/* Search */}
        <div className="flex-shrink-0">
          <Search
            label="Søk hendelser"
            value={searchFilter}
            onChange={onSearchFilterChange}
            placeholder="Søk hendelser..."
            variant="secondary"
            size="small"
            htmlSize={20}
          />
        </div>

        <Spacer />

        {/* Date Range */}
        <div className="flex-shrink-0">
          <Fieldset legend="Tidsperiode" size="small" hideLegend={true}>
            <Provider>
              <DatePicker {...datepickerProps}>
                <HStack gap="space-8" justify="start" wrap={false}>
                  <DatePicker.Input {...fromInputProps} label="Fra dato" size="small" hideLabel={true} />
                  <DatePicker.Input {...toInputProps} label="Til dato" size="small" hideLabel={true} />
                </HStack>
              </DatePicker>
            </Provider>
          </Fieldset>
        </div>

        {/* Clear Button */}
        <div className="flex-shrink-0">
          <Button
            variant="tertiary"
            size="small"
            onClick={handleClearFilters}
          >
            Tøm filtre
          </Button>
        </div>
      </HStack>
    </Box>
  );
}
