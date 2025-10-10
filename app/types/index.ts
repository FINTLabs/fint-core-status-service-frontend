// Table 1 - Main AdapterStatus List Data Structure
export interface IComponentData {
  packageName: string;
  healthy: "HEALTHY" | "UNHEALTHY";
  heartbeat: boolean;
  lastDelta: {
    healthy: boolean;
    date: string;
  };
  lastFull: {
    healthy: boolean;
    date: string;
    expectedDate: string;
  };
}

export interface IAdaptereData {
  [organisation: string]: {
    [domain: string]: {
      component: IComponentData[];
    };
  };
}

export interface IAdaptereTableRow {
  organisation: string;
  domain: string;
  components: IComponentData[];
  status: "ok" | "error";
}

// Table 2 - Detail View Data Structure
export interface IAdapterDetailData {
  adapterId: string;
  heartbeat: boolean;
  delta: string;
  full: {
    healthy: boolean;
    date: string;
    expectedDate: string;
  };
}

// Table 3 - Component Detail Data Structure
export interface IAdapterComponentData {
  adapter: string;
  heartbeatStatus: "ok" | "error";
  deltaTransfer: string;
  fullTransfer: string;
}

// Adapter Component Modal Data Structure
export interface ICapability {
  resourceName: string;
  fullSyncIntervalInDays: number;
  deltaSyncInterval: string;
  followsContract: boolean;
  lastFullSync: number | null;
  lastFullSyncTime: string | null;
}

export interface IAdapterComponentModalData {
  adapterId: string;
  username: string;
  orgId: string;
  heartbeatIntervalInMinutes: number;
  lastHeartbeat: number;
  components: string[];
  hasContact: boolean;
  capabilities: ICapability[];
  lastActivity: number;
}

// Events Data Structure
export interface IEventData {
  eventId: string;
  operation: "CREATE" | "UPDATE" | "DELETE";
  organization: string;
  resources: string;
  status: "ok" | "error";
  transferred: string;
  transportType?: string;
}

// Event Detail Data Structure
export interface IEventRequest {
  corrId: string;
  orgId: string;
  domainName: string;
  packageName: string;
  resourceName: string;
  operationType: "CREATE" | "UPDATE" | "DELETE";
  created: number;
  timeToLive: number;
}

export interface IEventResponse {
  corrId: string;
  orgId: string;
  adapterId: string;
  handledAt: number;
  operationType: "CREATE" | "UPDATE" | "DELETE";
  failed: boolean;
  errorMessage: string | null;
  rejected: boolean;
  rejectReason: string | null;
  conflicted: boolean;
  conflictReason: string | null;
}

export interface IEventDetail {
  request: IEventRequest;
  response: IEventResponse;
}

// Common types
export type HealthStatus = "HEALTHY" | "UNHEALTHY";
export type Status = "ok" | "error";
export type HeartbeatStatus = "ok" | "error";
export type OperationType = "CREATE" | "UPDATE" | "DELETE";
