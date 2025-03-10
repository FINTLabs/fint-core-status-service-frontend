import {IConsumerRequest} from "~/types/consumer/IConsumerRequest";

export const memoryUnits = ['Mi', 'Gi'] as const;
export type MemoryUnit = typeof memoryUnits[number];

export const cpuUnits = ['m', 'core'] as const;
export type CpuUnit = typeof cpuUnits[number];

export interface IAllocation<T extends string> {
  request: string;
  requestType: T;
  limit: string;
  limitType: T;
}

function parseCpuValue(value: string): { amount: string; unit: CpuUnit } {
  if (value.endsWith("m")) {
    return {amount: value.slice(0, -1), unit: "m"};
  }
  return {amount: value, unit: "core"};
}

function parseMemoryValue(value: string): { amount: string; unit: MemoryUnit } {
  if (value.endsWith("Mi")) {
    return {amount: value.slice(0, -2), unit: "Mi"};
  }
  if (value.endsWith("Gi")) {
    return {amount: value.slice(0, -2), unit: "Gi"};
  }

  throw new Error(`Invalid memory value: ${value}`);
}

export function exportCpuAllocation(consumer: IConsumerRequest): IAllocation<CpuUnit> {
  const {requestsCpu, limitsCpu} = consumer;
  const req = parseCpuValue(requestsCpu);
  const lim = parseCpuValue(limitsCpu);
  return {
    request: req.amount,
    requestType: req.unit,
    limit: lim.amount,
    limitType: lim.unit,
  };
}

export function exportMemoryAllocation(consumer: IConsumerRequest): IAllocation<MemoryUnit> {
  const {requestsMemory, limitsMemory} = consumer;
  const req = parseMemoryValue(requestsMemory);
  const lim = parseMemoryValue(limitsMemory);
  return {
    request: req.amount,
    requestType: req.unit,
    limit: lim.amount,
    limitType: lim.unit,
  };
}

export function allocationsFromRequest(consumer: IConsumerRequest) {
  return {
    cpu: exportCpuAllocation(consumer),
    memory: exportMemoryAllocation(consumer),
  };
}

export function defaultAllocations() {
  const cpuRequest = parseCpuValue("250m");
  const cpuLimit = parseCpuValue("500m");
  const memoryRequest = parseMemoryValue("256Mi");
  const memoryLimit = parseMemoryValue("512Mi");

  return {
    cpu: {
      request: cpuRequest.amount,
      requestType: cpuRequest.unit,
      limit: cpuLimit.amount,
      limitType: cpuLimit.unit,
    },
    memory: {
      request: memoryRequest.amount,
      requestType: memoryRequest.unit,
      limit: memoryLimit.amount,
      limitType: memoryLimit.unit,
    },
  };
}
