'use client'

import {consumerRequestEntities} from "@/components/dummydata/DummyData";
import DataTable from "@/components/datatable/DataTable";

export default function Event() {
    const columns = [
        {
            id: 'corrId',
            label: 'UUID',
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
            id: 'domainName',
            label: 'Domain',
            minWidth: 100,
            align: 'center'
        },
        {
            id: 'packageName',
            label: 'Package',
            minWidth: 100,
            align: 'center'
        },
        {
            id: 'resourceName',
            label: 'Resource',
            minWidth: 100,
            align: 'center'
        },
        {
            id: 'operation',
            label: 'Operation',
            minWidth: 170,
            align: 'center'
        },
        {
            id: "response",
            label: 'Response',
            minWidth: 170,
            align: 'center'
        },
        {
            id: 'created',
            label: 'Time',
            minWidth: 170,
            align: 'center',
            time: true
        }
    ];

    return (
        <DataTable columns={columns} data={consumerRequestEntities}/>
    )
}