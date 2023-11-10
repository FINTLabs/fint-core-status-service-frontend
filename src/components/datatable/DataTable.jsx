'use client'

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import DataTableHeader from "./DataTableHeader";
import DataTableRow from "./DataTableRow";
import FilterSection from "@/components/datatable/FilterSection";

export default function DataTable({columns, data}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [filterValues, setFilterValues] = React.useState({});

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleFilterChange = (columnId, value) => {
        setFilterValues({...filterValues, [columnId]: value});
    };

    const getFilteredData = () => {
        return data.filter(row => {
            return Object.entries(filterValues).every(([columnId, filterValue]) => {
                if (filterValue == null || filterValue === '') return true;
                return row[columnId] === filterValue;
            });
        });
    };

    return (
        <Paper sx={{width: '80%', overflow: 'hidden', margin: "auto"}}>
            <FilterSection columns={columns} data={data} filterValues={filterValues}
                           onFilterChange={handleFilterChange}/>
            <TableContainer sx={{maxHeight: "80vh"}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <DataTableHeader columns={columns}/>
                    </TableHead>
                    <TableBody>
                        {getFilteredData()
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <DataTableRow key={index} row={row} columns={columns}/>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={getFilteredData().length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}