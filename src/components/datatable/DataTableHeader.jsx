import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

function DataTableHeader({columns}) {

    return (
        <TableRow>
            {columns.map((column) => (
                <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                >
                    {column.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

export default DataTableHeader;
