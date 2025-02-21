import React, {useState} from "react";
import {Box, Button, DatePicker, HStack, Select, useRangeDatepicker, VStack} from "@navikt/ds-react";

interface DatePickerProps {
    placeholderFrom ?: number;
    placeholderTo ?: number;
    onSelectedDates?: (data: { from: number | null; to: number | null }) => void;
}


const DatePickerEvents: React.FC<DatePickerProps> = ({ onSelectedDates, placeholderFrom, placeholderTo }) => {

    const defaultFrom = placeholderFrom ? new Date(placeholderFrom) : new Date();
    const defaultTo = placeholderTo ? new Date(placeholderTo) : new Date();


    const {datepickerProps, toInputProps, fromInputProps, selectedRange,} = useRangeDatepicker({
        fromDate: new Date(new Date().setDate(new Date().getDate() - 1)),
        toDate: new Date(),
        onRangeChange: console.info,
        defaultSelected: {from: defaultFrom, to: defaultTo}
    });
    const [appliedDates, setAppliedDates] = useState({ from: 0, to: 0 });
    function convertToUnixTimeStamp(date: Date | null): number | null {
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
            setAppliedDates({ from: fromTimestamp, to: toTimestamp });
        }
    }

    function handleResetFilters(){
        onSelectedDates({
            from: convertToUnixTimeStamp(new Date(new Date().setDate(new Date().getDate() - 1))),
            to: convertToUnixTimeStamp(new Date()),
        });
    }

    const handlePresetSelect = (value) => {
        onSelectedDates({
            from: convertToUnixTimeStamp(new Date(new Date().setMinutes(new Date().getMinutes() - value))),
            to: convertToUnixTimeStamp(new Date()),
        });
    };

    return (
        <div className="min-h-12">
            <select onChange={(e) => handlePresetSelect(e.target.value)}>
                <option value="">Preset</option>
                <option value="5" >5 min</option>
                <option value="10">10 min</option>
                <option value="15">15 min</option>
                <option value="20">20 min</option>
                <option value="30">30 min</option>
                <option value="60">60 min</option>
            </select>
            <DatePicker
                {...datepickerProps}
                toDate={new Date()}
                fromDate={new Date(new Date().setDate(new Date().getDate() - 30))}
            >
                <HStack wrap gap="4" justify="center">
                    <DatePicker.Input
                        {...fromInputProps}
                        label="Fra"
                        ></DatePicker.Input>
                    <DatePicker.Input
                        {...toInputProps}
                        label="Til"
                    />
                    </HStack>
                </DatePicker>
            <Button style={{marginTop: 20, marginRight: 10}} onClick={handleApplyFilter}>Bruk</Button>
            <Button style={{marginTop: 20}} onClick={handleResetFilters}>Nullstill</Button>
        </div>
    );
};

export default DatePickerEvents;
