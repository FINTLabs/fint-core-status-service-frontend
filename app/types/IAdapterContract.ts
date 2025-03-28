export interface ICapabilityData {
  fullSyncIntervalInDays: number;
  deltaSyncInterval: 'IMMEDIATE' | string;
  followsContract: boolean;
  lastFullSync: number;
}
export interface IAdapterContract {
  adapterId: string;
  username: string;
  orgId: string;
  heartbeatIntervalInMinutes: number;
  components: string[];
  hasContact: boolean;
  capabilities: {
    [key: string]: ICapabilityData;
  };
  lastActivity: number;
}

export interface IContractModal {
  open: boolean;
  contract: IAdapterContract | null;
}
