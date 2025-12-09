export interface IUserSession {
  selectedEnv: "beta" | "api" | "alpha";
}
export type { IEvent, IRequestEvent, IResponseEvent } from "./Event";
export type { ISyncData, ISyncPage } from "./Sync";
export type { IAdapter, IPackageStatus, IStatusTimestamp, IAdapterComponent, IContract } from "./Adapter";
export type { IStats } from "./Stats";
