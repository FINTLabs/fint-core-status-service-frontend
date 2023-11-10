import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';

export default function FilterSection({ columns, data }) {
    const [filterValues, setFilterValues] = useState({});
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

    const handleFilterChange = (columnId, value) => {
        setFilterValues({...filterValues, [columnId]: value});
    };

    return (
        <div className="w-full p-4">
            {columns.map(column => {
                if (column.filter) {
                    return (
                        <Autocomplete
                            key={column.id}
                            options={uniqueColumnData[column.id] || []}
                            getOptionLabel={(option) => option.toString()}
                            sx={{width: column.minWidth}} // Set the base width and minimum width
                            onChange={(event, value) => handleFilterChange(column.id, value)}
                            renderInput={(params) => (
                                <TextField {...params} label={column.label} variant="outlined" />
                            )}
                        />
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
}
