'use client'

import {consumerRequestEntities} from "@/components/dummydata/DummyData";
import DataTable from "@/components/datatable/DataTable";

export default function Event() {
    const columns = [
        {
            id: 'corrId',
            label: 'UUID',
            minWidth: 170,
            align: 'left'
        },
        {
            id: 'orgId',
            label: 'OrgId',
            minWidth: 100,
            align: 'left'
        },
        {
            id: 'domainName',
            label: 'Domain',
            minWidth: 100,
            align: 'left'
        },
        {
            id: 'packageName',
            label: 'Package',
            minWidth: 100,
            align: 'left'
        },
        {
            id: 'resourceName',
            label: 'Resource',
            minWidth: 100,
            align: 'left'
        },
        {
            id: 'operation',
            label: 'Operation',
            minWidth: 170,
            align: 'left'
        },
        {
            id: "response",
            label: 'Response',
            minWidth: 170,
            align: 'left'
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