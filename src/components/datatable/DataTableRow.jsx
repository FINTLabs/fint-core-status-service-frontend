import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from "@mui/material/TableRow";

function DataTableRow({ row, columns }) {
    return (
        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
            {columns.map((column) => {
                return (
                    <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(row) : row[column.id]}
                    </TableCell>
                );
            })}
        </TableRow>
    );
}

export default DataTableRow;
