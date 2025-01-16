export interface Capability {
  domainName: string;
  packageName: string;
  resourceName: string;
  fullSyncIntervalInDays: number;
  deltaSyncInterval: string | null;
  component: string;
  entityUri: string;
}

export interface AdapterContract {
  adapterId: string;
  username: string;
  orgId: string;
  heartbeatIntervalInMinutes: number;
  components: string[];
  hasContact: boolean;
  capabilities: Capability[];
  lastActivity: number;
}

export interface ContractModal {
  open: boolean;
  contract: AdapterContract | null;
}

export function convertLastActivity(timestamp: number): string {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;

}

export function formatComponents(compontents: string[]): Array<string> {
  const resources = new Array<string>;
  compontents.forEach((component: string) => {
    const parts = component.split('.');
    if (parts.length > 1) {
        if (!resources.find(resource => resource === parts[0])) {
            resources.push(parts[0]);
        }
    }
  })

  return resources;
}