import {FintEvent} from "~/types/Event";

export function getOrgs(events: Array<FintEvent>): Array<string> {
    if (!Array.isArray(events)) {
        console.error("Expected events to be an array, but got:", events);
        return [];
    }
    const orgs = new Array<string>();
    events.forEach((event: FintEvent) => {
        const orgId = event.orgId;
        if (!orgs.includes(orgId)) {
            orgs.push(orgId);
        }
    })
    return orgs;
}

export function filterByOrgId(orgIds: Array<string>, contracts: Array<FintEvent>): Array<FintEvent> {
    return contracts.filter(value => orgIds.includes(value.orgId))
}