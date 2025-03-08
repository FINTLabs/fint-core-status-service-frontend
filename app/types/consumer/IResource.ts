import {IConsumerRequest} from "~/types/consumer/IConsumerRequest";

export interface IResource {
  name: string
  enabled: boolean
  writeable: boolean
  cacheDisabled: boolean
}

export function resourcesFromRequest(consumerRequest: IConsumerRequest): IResource[] {
  const resourcesArray = consumerRequest.resources || [];
  const writeableArray = consumerRequest.writeableResources || [];
  const cacheDisabledArray = consumerRequest.cacheDisabledResources || [];

  const allResourceNames = new Set([
    ...resourcesArray,
    ...writeableArray,
    ...cacheDisabledArray,
  ]);

  return Array.from(allResourceNames).map((name) => ({
    name,
    enabled: resourcesArray.includes(name),
    writeable: writeableArray.includes(name),
    cacheDisabled: cacheDisabledArray.includes(name),
  }));
}