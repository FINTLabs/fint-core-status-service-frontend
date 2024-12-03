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

export function timeSince(timestamp: number | undefined): string {
  const now = new Date().getTime();
  const createdTimeStamp = new Date(timestamp);

  const elapsedMs = now - createdTimeStamp.getTime();
  const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60));
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  if (elapsedDays > 0) {
    const remainingHours = elapsedHours % 24;
    return `${elapsedDays} dager og ${remainingHours} timer`;
  } else {
    const remainingMinutes = elapsedMinutes % 60;
    return `${elapsedHours} timer og ${remainingMinutes} minutter`;
  }
}
