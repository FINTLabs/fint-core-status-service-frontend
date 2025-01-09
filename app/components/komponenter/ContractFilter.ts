import {AdapterContract} from "~/types/AdapterContract";

export function getOrgs(contracts: Array<AdapterContract>): Array<string> {
    const orgs = new Array<string>();
    contracts.forEach((contract: AdapterContract) => {
        const orgId = contract.orgId;
        if (!orgs.includes(orgId)){
            orgs.push(orgId);
        }
    })
    return orgs;
}

export function filterByOrgId(orgIds: Array<string>, contracts: Array<AdapterContract>): Array<AdapterContract> {
    return contracts.filter(value => orgIds.includes(value.orgId))
}