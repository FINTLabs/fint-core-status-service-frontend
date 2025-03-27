import { IFintEvent } from "~/types/IFintEvent";

export function getOrgs(events: Array<IFintEvent>): Array<string> {
  if (!Array.isArray(events)) {
    console.error("Expected events to be an array, but got:", events);
    return [];
  }
  const orgs = new Array<string>();
  events.forEach((event: IFintEvent) => {
    const orgId = event.orgId;
    if (!orgs.includes(orgId)) {
      orgs.push(orgId);
    }
  });
  return orgs;
}

export function filterByOrgId(
  orgIds: Array<string>,
  contracts: Array<IFintEvent>
): Array<IFintEvent> {
  return contracts.filter((value) => orgIds.includes(value.orgId));
}
