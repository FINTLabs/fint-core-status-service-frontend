'use client'

import DataTable from "@/components/datatable/DataTable";
import {adapterFullSyncEntities} from "@/components/dummydata/DummyData";

export default function Event() {
    const columns = [
        {
            id: 'corrId',
            label: 'UUID',
            minWidth: 170,
            align: 'center',
            searchable: true
        },
        {
            id: 'adapterId',
            label: 'Adapter ID',
            minWidth: 170,
            align: 'center',
            searchable: true
        },
        {
            id: 'orgId',
            label: 'OrgId',
            minWidth: 100,
            align: 'center',
            searchable: true
        },
        {
            id: 'uriRef',
            label: 'Uri',
            minWidth: 100,
            align: 'center',
            searchable: true
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