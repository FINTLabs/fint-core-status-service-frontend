'use client'

import DataTable from "@/components/datatable/DataTable";
import {adapterFullSyncEntities} from "@/components/dummydata/DummyData";

export default function Event() {
    const columns = [
        {
            id: 'corrId',
            label: 'UUID',
            minWidth: 170,
            align: 'center'
        },
        {
            id: 'adapterId',
            label: 'Adapter ID',
            minWidth: 170,
            align: 'center'
        },
        {
            id: 'orgId',
            label: 'OrgId',
            minWidth: 100,
            align: 'center'
        },
        {
            id: 'uriRef',
            label: 'Uri',
            minWidth: 100,
            align: 'center'
        },
        {
            id: 'totalSize',
            label: 'Total size',
            minWidth: 100,
            align: 'center'
        },
        {
            id: 'time',
            label: 'Time',
            minWidth: 170,
            align: 'center'
        }
    ];

    return (
        <DataTable columns={columns} data={adapterFullSyncEntities.concat(adapterFullSyncEntities)}/>
    )
}