import {IConsumerRequest} from "~/types/consumer/IConsumerRequest";
import {
  allocationsFromRequest,
  CpuUnit,
  defaultAllocations,
  IAllocation,
  MemoryUnit
} from "~/types/consumer/IAllocation";
import {IResource} from "~/types/consumer/IResource";
import {componentFromRequest} from "~/types/consumer/IComponent";

export interface IConsumer {
  version: string;
  shared: boolean;
  organisations: string[];
  components: Record<string, IResource[]>
  allocations: {
    memory: IAllocation<MemoryUnit>;
    cpu: IAllocation<CpuUnit>;
  };
}

export function newConsumer(): IConsumer {
  return {
    version: "",
    shared: false,
    organisations: [],
    components: {},
    allocations: defaultAllocations()
  }
}

export function consumerFromRequest(consumerRequest: IConsumerRequest): IConsumer {
  return {
    version: consumerRequest.version,
    shared: true,
    organisations: [consumerRequest.org],
    components: componentFromRequest(consumerRequest),
    allocations: allocationsFromRequest(consumerRequest)
  }
}
