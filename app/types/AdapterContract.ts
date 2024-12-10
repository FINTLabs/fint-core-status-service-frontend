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
}

export interface ContractModal {
  open: boolean;
  contract: AdapterContract | null;
}