import {IConsumerRequest} from "~/types/consumer/IConsumerRequest";
import {
  allocationsFromRequest,
  CpuUnit,
  defaultAllocations,
  IAllocation,
  MemoryUnit
} from "~/types/consumer/IAllocation";

export interface IConsumerFields {
  version: string;
  shared: boolean;
  organisations: string[];
  components: string[];
  allocations: {
    memory: IAllocation<MemoryUnit>;
    cpu: IAllocation<CpuUnit>;
  };
}

export function newConsumerFields(): IConsumerFields {
  return {
    version: "",
    shared: false,
    organisations: [],
    components: [],
    allocations: defaultAllocations()
  }
}

export function consumerFieldsFromRequest(consumerRequest: IConsumerRequest): IConsumerFields {
  return {
    version: consumerRequest.version,
    shared: true,
    organisations: [consumerRequest.org],
    components: [`${consumerRequest.domain} ${consumerRequest.package}`],
    allocations: allocationsFromRequest(consumerRequest)
  }
}
