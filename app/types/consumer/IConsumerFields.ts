import {IConsumerRequest} from "~/types/consumer/IConsumerRequest";
import {allocationsFromRequest, CpuUnit, defaultAllocations, IAllocation, MemoryUnit} from "~/types/consumer/IAllocation";

export interface IConsumerFields {
  version: string;
  shared: boolean;
  allocations: {
    memory: IAllocation<MemoryUnit>;
    cpu: IAllocation<CpuUnit>;
  };
}

export function newConsumerFields() {
  return {
    version: "",
    shared: false,
    allocations: defaultAllocations()
  }
}

export function consumerFieldsFromRequest(consumerRequest: IConsumerRequest): IConsumerFields {
  return {
    version: consumerRequest.version,
    shared: true,
    allocations: allocationsFromRequest(consumerRequest)
  }
}
