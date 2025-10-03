// Table 1 - Main Adaptere List Data Structure
export interface ComponentData {
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

export interface AdaptereData {
  [organisation: string]: {
    [domain: string]: {
      component: ComponentData[];
    };
  };
}

export interface AdaptereTableRow {
  organisation: string;
  domain: string;
  components: ComponentData[];
  status: "ok" | "error";
}

// Table 2 - Detail View Data Structure
export interface AdapterDetailData {
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
export interface AdapterComponentData {
  adapter: string;
  driftspuls: "ok" | "feil";
  deltaOverføring: string;
  fullOverføring: string;
}

// Hendelser Data Structure
export interface HendelserData {
  hendelseId: string;
  operasjon: "CREATE" | "UPDATE" | "DELETE";
  organisasjon: string;
  ressurser: string;
  status: "ok" | "error";
  overført: string;
}

// Common types
export type HealthStatus = "HEALTHY" | "UNHEALTHY";
export type Status = "ok" | "error";
export type DriftspulsStatus = "ok" | "feil";
export type OperasjonType = "CREATE" | "UPDATE" | "DELETE";
