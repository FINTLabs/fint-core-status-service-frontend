export enum OperationType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  VALIDATE = "VALIDATE",
  DELETE = "DELETE",
}

export interface SyncPageEntry {
  identifier: string;
  resource: string;
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
  value?: string;
}

export interface ResponseFintEvent {
  conflictReason?: string;
  conflicted?: boolean | undefined;
  corrId: string;
  orgId: string;
  adapterId: string;
  handledAt: number;
  value?: SyncPageEntry;
  operationType: OperationType;
  failed: boolean;
  errorMessage: string | null;
  rejected: boolean;
  rejectReason: string | null;
}

export interface IFintEvent {
  topic: string;
  corrId: string;
  orgId: string;
  hasError: boolean;
  requestEvent: RequestFintEvent | null;
  responseEvent: ResponseFintEvent | null;
}
