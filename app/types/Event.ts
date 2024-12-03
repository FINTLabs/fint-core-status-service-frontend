export enum OperationType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  VALIDATE = "VALIDATE",
  DELETE = "DELETE",
}

export interface SyncPageEntry {
  identifier: string;
}

export interface RequestFintEvent {
  corrId: string;
  orgId: string;
  domainName: string;
  packageName: string;
  resourceName: string;
  operationType: OperationType;
  created: number;
  timeToLive: number;
}

export interface ResponseFintEvent {
  corrId: string;
  orgId: string;
  adapterId: string;
  handledAt: number;
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
