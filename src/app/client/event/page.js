'use client'

import {consumerRequestEntities} from "@/components/dummydata/DummyData";
import DataTable from "@/components/datatable/DataTable";
import {sharedColumns} from "@/components/datatable/SharedColumns";

export default function Event() {
    const columns = [
        sharedColumns.corrId,
        sharedColumns.orgId,
        {
            id: 'domainName',
            label: 'Domain',
            minWidth: 150,
            align: 'left',
            filter: true
        },
        {
            id: 'packageName',
            label: 'Package',
            minWidth: 150,
            align: 'left',
            filter: true
        },
        {
            id: 'resourceName',
            label: 'Resource',
            minWidth: 150,
            align: 'left',
            filter: true
        },
        {
            id: 'operation',
            label: 'Operation',
            minWidth: 125,
            align: 'left',
            filter: true
        },
        {
            id: "response",
            label: 'Response',
            minWidth: 150,
            align: 'left',
            filter: true
        },
        {
            id: 'created',
            label: 'Time',
            minWidth: 170,
            align: 'left',
            time: true
        }
    ];

    return (
        <DataTable columns={columns} data={consumerRequestEntities}/>
    )
}