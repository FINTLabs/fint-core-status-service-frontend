export interface IUserSession {
  selectedEnv: "beta" | "api" | "alpha";
}
export type { IEvent, IRequestEvent, IResponseEvent } from "./Event";
export type { ISyncData, ISyncPage } from "./Sync";
export type { IAdapter, IPackageStatus, IStatusTimestamp } from "./Adapter";
