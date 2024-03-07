import {json} from "@remix-run/react";
import {useLoaderData} from "react-router";
import DataGridDemo from "~/components/data-table";
import {GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import GetAdapterEvents from "~/server/adapter.event.server";
import DataTable from "~/components/data-table";

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
        field: 'adapter',
        headerName: 'Adapter',
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
        width: 350,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'size',
        headerName: 'Size',
        description: 'This column has a value getter and is not sortable.',
        width: 100,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'time',
        headerName: 'Time',
        width: 180,
        headerAlign: 'center',
        align: 'center',
    },
];

export const loader = async () => {
    const rows = await GetAdapterEvents()
    return json({rows})
}

export default function AdapterEvent() {
    const {rows} = useLoaderData<typeof loader>()
    return (
        <DataTable columns={columns} rows={rows}/>
    )
}