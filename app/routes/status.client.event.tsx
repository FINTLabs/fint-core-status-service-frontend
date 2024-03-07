import {json} from "@remix-run/react";
import {useLoaderData} from "react-router";
import DataGridDemo from "~/components/data-table";
import {GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import DataTable from "~/components/data-table";
import GetClientEvents from "~/server/client.event.server";

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Id',
        width: 300,
        headerAlign: 'center',
        align: 'center',
        sortable: false,
        filterable: false,
    },
    {
        field: 'client',
        headerName: 'Client',
        width: 200,
        editable: true,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'org',
        headerName: 'Org',
        width: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'uri',
        headerName: 'Uri',
        type: 'number',
        width: 300,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'operation',
        headerName: 'Operation',
        width: 100,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'response',
        headerName: 'Response',
        width: 100,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'time',
        headerName: 'Time',
        width: 140,
        headerAlign: 'center',
        align: 'center',
    },
];

export const loader = async () => {
    const rows = await GetClientEvents();
    return json({rows});
}

export default function AdapterEvent() {
    const {rows} = useLoaderData<typeof loader>()
    return (
        <DataTable columns={columns} rows={rows}/>
    )
}