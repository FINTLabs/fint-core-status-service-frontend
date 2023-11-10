'use client'

import DataTable from "@/components/datatable/DataTable";
import {adapterContractEntities} from "@/components/dummydata/DummyData";

export default function Register() {
    const columns = [
        {
            id: 'adapterId',
            label: 'Adapter ID',
            minWidth: 170,
            align: 'left',
            filter: true
        },
        {
            id: 'username',
            label: 'Username',
            minWidth: 170,
            align: 'left',
            filter: true
        },
        {
            id: 'orgId',
            label: 'OrgId',
            minWidth: 100,
            align: 'left',
            filter: true
        },
        {
            id: 'isConsiderHealthy',
            label: 'Healthy',
            minWidth: 100,
            align: 'left',
            filter: true
        },
        {
            id: 'lastSeen',
            label: 'Last seen',
            minWidth: 170,
            align: 'left',
            time: true
        },
        {
            id: 'time',
            label: 'Registered',
            minWidth: 170,
            align: 'left',
            time: true
        }

    ];

    return (
        <DataTable columns={columns} data={adapterContractEntities.concat(adapterContractEntities)}/>
    )
}