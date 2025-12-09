// Comes from component endpoint
// export interface IAdapter {
//   packageName: string;
//   healthy: string;
//   heartBeat: boolean;
//   lastDelta: {
//     healthy: string;
//     date: number | null;
//     expectedDate?: number | null;
//   } | null;
//   lastFull: {
//     healty: string;
//     date: number | null;
//     expectedDate: number | null;
//   } | null;
// }

//TODO: fix spelling error in backend
// export interface IAdapter {
//   [orgId: string]: IPackageStatus[];
// }

export interface IAdapter {
  organzation: string;
  domain: string;
  heartBeat: boolean;
}

export interface IAdapterComponent {
  orgId: string;
  component: string;
  resource: string;
  heartbeat: boolean;
  followsContract: boolean;
  lastDelta: number;
  lastFull: number | null;
}

export interface IContract {
  adapterId: string;
  heartbeat: boolean;
  lastDelta: number | null;
  lastFull: number | null;
}

//TODO: check if these are in use
export interface IPackageStatus {
  packageName: string;
  healty: string; // (kept as spelled in your data)
  heartBeat: boolean;
  lastDelta: IStatusTimestamp | null;
  lastFull: IStatusTimestamp | null;
}

export interface IStatusTimestamp {
  healty: string;
  date: number;
  expectedDate?: number; // only present on lastFull
}
