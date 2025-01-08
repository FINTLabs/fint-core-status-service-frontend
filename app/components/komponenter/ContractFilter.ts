import {AdapterContract} from "~/types/AdapterContract";


export function filterByOrgId(orgId: string, contracts: Array<AdapterContract>): Array<AdapterContract> {
    const filterdByOrgId = new Array<AdapterContract>
    contracts.forEach(contract => {
        if (contract.orgId === orgId) {
            filterdByOrgId.push(contract);
        }
    })
    return filterdByOrgId
}