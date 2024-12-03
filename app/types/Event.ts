export enum OperationType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

export interface SyncPageEntry {
  identifier: string;
  resource: any;
}

export interface RequestFintEvent {
  corrId: string;
  orgId: string;
  domainName: string;
  packageName: string;
  resourceName: string;
  operationType: OperationType;
  created: number; // timestamp
  timeToLive: number; // timestamp
  value: any;
}

export interface ResponseFintEvent {
  corrId: string;
  orgId: string;
  adapterId: string;
  handledAt: number; // timestamp
  value: SyncPageEntry;
  operationType: OperationType;
  failed: boolean;
  errorMessage: string | null;
  rejected: boolean;
  rejectReason: string | null;
}

export interface FintEvent {
  corrId: string;
  orgId: string;
  hasError: boolean;
  requestEvent: RequestFintEvent | null;
  responseEvent: ResponseFintEvent | null;
}
