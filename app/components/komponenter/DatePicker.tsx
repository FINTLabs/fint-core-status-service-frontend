import React from "react";
import {Box, Button, DatePicker, HStack, useRangeDatepicker} from "@navikt/ds-react";

interface DatePickerProps {
    onSelectedDates?: (data: { from: number | null; to: number | null }) => void;
}

const DatePickerEvents: React.FC<DatePickerProps> = ({ onSelectedDates }) => {
    const {datepickerProps, toInputProps, fromInputProps, selectedRange,} = useRangeDatepicker({
        fromDate: new Date(new Date().setDate(new Date().getDate() - 1)),
        toDate: new Date(),
        onRangeChange: console.info,
    });

    function convertToUnixTimeStamp(date: Date | null): number | null {
        console.log("picked time: ",date?.getTime())
        return date ? date.getTime() : null;
    }

    function handleApplyFilter() {
        if (selectedRange && onSelectedDates) {
            const fromTimestamp = convertToUnixTimeStamp(selectedRange.from);
            let toDate = new Date(selectedRange.to);
            const today = new Date();
            if (toDate.toDateString() === today.toDateString()) {
                toDate = today;
            } else {
                toDate.setHours(23, 59, 59, 999);
            }
            const toTimestamp = convertToUnixTimeStamp(toDate);
            onSelectedDates({
                from: fromTimestamp,
                to: toTimestamp,
            });
        }
    }

    function handleResetFilters(){
        onSelectedDates({
            from: convertToUnixTimeStamp(new Date(new Date().setDate(new Date().getDate() - 1))),
            to: convertToUnixTimeStamp(new Date()),
        });
    }

    return (
        <div className="min-h-12">
            <DatePicker
                {...datepickerProps}
                toDate={new Date()}
                fromDate={new Date(new Date().setDate(new Date().getDate() - 30))}
            >
                <HStack wrap gap="4" justify="center">
                    <DatePicker.Input
                        {...fromInputProps}
                        label="Fra"
                        placeholder={
                            selectedRange?.from
                                ? selectedRange.from.toLocaleDateString("no-NO")
                                : "dd.mm.åååå"
                        }
                    />
                </HStack>
                <HStack wrap gap="4" justify="center">
                <DatePicker.Input
                    {...toInputProps}
                    label="Til"
                    placeholder={
                        selectedRange?.to
                            ? selectedRange.to.toLocaleDateString("no-NO")
                            : "dd.mm.åååå"
                    }
                />
                </HStack>
            </DatePicker>
            <Button style={{marginTop: 20}} onClick={handleApplyFilter}>Bruk filter</Button>
            <Button style={{marginTop: 20}} onClick={handleResetFilters}>Reset filter</Button>
        </div>
    );
};

export default DatePickerEvents;
