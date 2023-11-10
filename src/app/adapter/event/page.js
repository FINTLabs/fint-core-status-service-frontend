'use client'

import DataTable from "@/components/datatable/DataTable";
import {adapterFullSyncEntities} from "@/components/dummydata/DummyData";
import {sharedColumns} from "@/components/datatable/SharedColumns";

export default function Event() {
    const columns = [
        sharedColumns.corrId,
        {
            id: 'adapterId',
            label: 'Adapter ID',
            minWidth: 170,
            align: 'left',
            filter: true
        },
        sharedColumns.orgId,
        {
            id: 'uriRef',
            label: 'Uri',
            minWidth: 100,
            align: 'left',
        },
        {
            id: 'totalSize',
            label: 'Total size',
            minWidth: 100,
            align: 'left'
        },
        {
            id: 'time',
            label: 'Time',
            minWidth: 170,
            align: 'left',
            time: true
        }
    ];

    return (
        <DataTable columns={columns} data={adapterFullSyncEntities.concat(adapterFullSyncEntities)}/>
    )
}