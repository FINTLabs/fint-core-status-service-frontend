import {AdapterContract} from "~/types/AdapterContract";

export function getOrgs(contracts: Array<AdapterContract>): Array<string> {
    const orgs = new Array<string>();
    contracts.forEach((contract: AdapterContract) => {
        const orgId = contract.orgId;
        if (!orgs.includes(orgId)) {
            orgs.push(orgId);
        }
    })
    return orgs;
}

export function getComponents(contracts: Array<AdapterContract>): Map<string, Array<string>> {
    const components = new Map<string, Array<string>>();

    contracts.forEach((contract: AdapterContract) => {
        contract.components.forEach((component) => {
            const [componentMapKey, componentMapValue] = component.split(".");
            const currentList = components.get(componentMapKey) || [];
            const updatedSet = new Set(currentList);
            updatedSet.add(componentMapValue);
            components.set(componentMapKey, Array.from(updatedSet));
        });
    });
    return components;
}

export function filterByOrgId(orgIds: Array<string>, contracts: Array<AdapterContract>): Array<AdapterContract> {
    return contracts.filter(value => orgIds.includes(value.orgId))
}