import { Box, DatePicker, HStack, useRangeDatepicker } from "@navikt/ds-react";
import React, { useEffect } from "react";

interface DatePickerProps {
    onSelectedDates?: (data: { from: number | null; to: number | null }) => void;
}

const DatePickerEvents: React.FC<DatePickerProps> = ({ onSelectedDates }) => {
    const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
        useRangeDatepicker({
            fromDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            toDate: new Date(),
            onRangeChange: console.info,
        });

    function convertToUnixTimeStamp(date: Date | null): number | null {
        return date ? date.getTime() : null;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (selectedRange && onSelectedDates) {
                onSelectedDates({
                    from: convertToUnixTimeStamp(selectedRange.from),
                    to: convertToUnixTimeStamp(selectedRange.to),
                });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [selectedRange, onSelectedDates]);

    return (
        <div className="min-h-12">
            <DatePicker
                {...datepickerProps}
                toDate={new Date()}
                fromDate={new Date(new Date().setDate(new Date().getDate() - 30))}
            >
                <HStack wrap gap="4" justify="center">
                    <DatePicker.Input {...fromInputProps} label="Fra" placeholder={selectedRange?.from}/>
                </HStack>
                <DatePicker.Input {...toInputProps} label="Til" placeholder={selectedRange?.to} />
            </DatePicker>
            {selectedRange && (
                <Box paddingBlock="4 0">
                    <div>{convertToUnixTimeStamp(selectedRange.from)}</div>
                    <div>{convertToUnixTimeStamp(selectedRange.to)}</div>
                </Box>
            )}
        </div>
    );
};

export default DatePickerEvents;
