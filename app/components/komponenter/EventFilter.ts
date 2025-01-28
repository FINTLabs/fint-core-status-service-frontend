import {FintEvent} from "~/types/Event";
import {AdapterContract} from "~/types/AdapterContract";

export function getOrgs(events: Array<FintEvent>): Array<string> {
    const orgs = new Array<string>();
    events.forEach((event: FintEvent ) => {
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