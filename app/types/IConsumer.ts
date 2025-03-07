import {IResource} from "~/types/IComponent";

export type MemoryUnit = "Mi" | "Gi";
export type CpuUnit = "mm" | "core";

export interface IAllocation<T extends string> {
  request: string;
  requestType: T;
  limit: string;
  limitType: T;
}

export interface IConsumer {
  components: Record<string, IResource[]>;
  organisations: string[];
  version: string;
  shared: boolean;
  allocations: {
    memory: IAllocation<MemoryUnit>;
    cpu: IAllocation<CpuUnit>;
  };
  writeableResources: string[];
  cacheDisabledResources: string[];
}

export const emptyConsumer: IConsumer = {
  components: {},
  organisations: [],
  version: "",
  shared: false,
  allocations: {
    memory: {
      request: "256",
      requestType: "Mi",
      limit: "512",
      limitType: "Mi"
    },
    cpu: {
      request: "100",
      requestType: "mm",
      limit: "500",
      limitType: "mm"
    }
  },
  writeableResources: [],
  cacheDisabledResources: []
};

