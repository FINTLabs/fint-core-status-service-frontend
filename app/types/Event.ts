export enum OperationType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  VALIDATE = "VALIDATE",
  DELETE = "DELETE",
}

export interface SyncPageEntry {
  identifier: string;
  resource: string
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
  topic: string;
  corrId: string;
  orgId: string;
  hasError: boolean;
  requestEvent: RequestFintEvent | null;
  responseEvent: ResponseFintEvent | null;
}

export function timeSince(
    timestamp: number | undefined,
    compareTo: number = new Date().getTime()
): string {
  const createdTimeStamp = new Date(timestamp);

  const elapsedMs = compareTo - createdTimeStamp.getTime();
  const elapsedSeconds = Math.floor(elapsedMs / 1000);
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);

  if (timestamp && compareTo !== new Date().getTime()) {
    const remainingHours = elapsedHours % 24;
    const remainingMinutes = elapsedMinutes % 60;
    const remainingSeconds = elapsedSeconds % 60;
    if (elapsedDays > 0) {
      return `${elapsedDays} dager, ${remainingHours} timer, ${remainingMinutes} minutter og ${remainingSeconds} sekunder`;
    } else if (elapsedHours > 0) {
      return `${elapsedHours} timer, ${remainingMinutes} minutter og ${remainingSeconds} sekunder`;
    } else if (elapsedMinutes > 0) {
      return `${elapsedMinutes} minutter og ${remainingSeconds} sekunder`;
    } else {
      return `${elapsedSeconds} sekunder`;
    }
  } else {
    const remainingHours = elapsedHours % 24;
    if (elapsedDays > 0) {
      return `${elapsedDays} dager og ${remainingHours} timer`;
    } else {
      const remainingMinutes = elapsedMinutes % 60;
      return `${elapsedHours} timer og ${remainingMinutes} minutter`;
    }
  }
}
