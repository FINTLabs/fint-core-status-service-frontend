export interface IContractStatus {
  organzation: string;
  domain: string;
  heartBeat: boolean;
}

export interface IContractDomain {
  component: string;
  hasContact: boolean;
  answersEvents: boolean;
  lastDeltaSync: number | null;
  lastFullSync: number | null;
}

export interface IContractComponent {
  adapterId: string;
  heartbeat: boolean;
  lastDelta: number;
  lastFull: number;
}
