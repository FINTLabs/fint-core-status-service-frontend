import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from "@mui/material/TableRow";

function DataTableRow({ row, columns }) {
    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
            {columns.map((column) => {
                return (
                    <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(row) :
                            (column.time ? formatEpochToLocalTime(row[column.id]) : row[column.id])}
                    </TableCell>
                );
            })}
        </TableRow>
    );
}

function formatEpochToLocalTime(epoch) {
    const date = new Date(epoch);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

export default DataTableRow;
