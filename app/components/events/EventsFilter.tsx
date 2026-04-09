import {
  Box,
  Button,
  DatePicker,
  HGrid,
  HStack,
  TextField,
  useRangeDatepicker,
  VStack,
} from "@navikt/ds-react";
import { FunnelIcon } from "@navikt/aksel-icons";
import { useEffect, useState } from "react";
import {
  applyTimeToDate,
  createLast30DaysDisabledDays,
  formatTimeValue,
} from "~/utils/time";

interface EventsFilterProps {
  filters: {
    dateRange: { from: Date | undefined; to: Date | undefined };
  };
  onApplyFilters: (value: EventsFilterProps["filters"]) => void;
}

export function EventsFilter({ filters, onApplyFilters }: EventsFilterProps) {
  const [dateRange, setDateRange] = useState(filters.dateRange);
  const [fromTime, setFromTime] = useState(
    formatTimeValue(filters.dateRange.from),
  );
  const [toTime, setToTime] = useState(formatTimeValue(filters.dateRange.to));

  useEffect(() => {
    setDateRange(filters.dateRange);
    setFromTime(formatTimeValue(filters.dateRange.from));
    setToTime(formatTimeValue(filters.dateRange.to));
  }, [filters]);

  const disabledDays = createLast30DaysDisabledDays();
  const { datepickerProps, toInputProps, fromInputProps } = useRangeDatepicker({
    fromDate: new Date("2020-01-01"),
    toDate: new Date("2030-12-31"),
    onRangeChange: (value) => {
      setDateRange({
        from: value?.from,
        to: value?.to,
      });
    },
    defaultSelected: dateRange.from || dateRange.to ? dateRange : undefined,
    disabled: disabledDays,
  });

  const handleClearDates = () => {
    const clearedDateRange = { from: undefined, to: undefined };
    setDateRange(clearedDateRange);
    setFromTime("");
    setToTime("");

    onApplyFilters({
      ...filters,
      dateRange: clearedDateRange,
    });
  };

  return (
    <VStack gap="space-16">
      <Box
        padding="space-16"
        borderRadius="8"
        shadow="dialog"
        marginBlock="space-16"
      >
        <DatePicker
          key={`${dateRange.from?.getTime() ?? "none"}-${dateRange.to?.getTime() ?? "none"}`}
          {...datepickerProps}
        >
          <HGrid columns={4} gap="space-24">
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
            <DatePicker.Input {...toInputProps} label="Til dato" size="small" />
            <TextField
              label="Til tid"
              size="small"
              type="time"
              value={toTime}
              onChange={(event) => setToTime(event.target.value)}
            />
          </HGrid>
        </DatePicker>
        <HStack justify="space-between" marginBlock="space-16">
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
                ...filters,
                dateRange: appliedDateRange,
              });
            }}
          >
            Bruk datoer
          </Button>
          <Button variant="tertiary" size="small" onClick={handleClearDates}>
            Tøm datoer
          </Button>
        </HStack>
      </Box>
    </VStack>
  );
}
