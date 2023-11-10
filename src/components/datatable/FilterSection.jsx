import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';

export default function FilterSection({ columns, data, filterValues, onFilterChange }) {
    const [uniqueColumnData, setUniqueColumnData] = useState({});

    useEffect(() => {
        const uniqueData = {};
        columns.forEach(column => {
            if (column.filter) {
                uniqueData[column.id] = [...new Set(data.map(item => item[column.id]))];
            }
        });
        setUniqueColumnData(uniqueData);
    }, [columns, data]);

    return (
        <div className="w-full p-4 flex gap-1">
            {columns.map(column => {
                if (column.filter) {
                    return (
                        <Autocomplete
                            key={column.id}
                            options={uniqueColumnData[column.id] || []}
                            getOptionLabel={(option) => option.toString()}
                            value={filterValues[column.id]}
                            onChange={(event, value) => onFilterChange(column.id, value)}
                            renderInput={(params) => (
                                <TextField {...params} label={column.label} variant="outlined" />
                            )}
                            sx={{width: column.minWidth}}
                        />
                    );
                }
            })}
        </div>
    );
}
