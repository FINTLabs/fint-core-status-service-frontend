import {IConsumer} from "~/types/consumer/IConsumer";
import {IResource} from "~/types/consumer/IResource";

export interface IConsumerRequest {
  domain: string;
  package: string;
  version: string;
  org: string;
  shared: boolean;
  limitsCpu: string;
  limitsMemory: string;
  requestsCpu: string;
  requestsMemory: string;
  resources: string[];
  writeableResources: string[];
  cacheDisabledResources: string[];
}

export function fromConsumerToRequests(consumer: IConsumer) {
  const requests: IConsumerRequest[] = []

  consumer.organisations.forEach(org =>
    Object.entries(consumer.components).forEach(([key, resourceList]) => {
        const [domain, pkg] = key.split(" ")

        const enabledResources = (resourceList as IResource[])
          .filter(resource => resource.enabled)
          .map(resource => resource.name);

        const writeableResources = (resourceList as IResource[])
          .filter(resource => resource.writeable)
          .map(resource => resource.name);

        const cacheDisabledResources = (resourceList as IResource[])
          .filter(resource => resource.cacheDisabled)
          .map(resource => resource.name);

        requests.push({
          domain: domain,
          package: pkg,
          org: org,
          shared: consumer.shared,
          version: consumer.version,
          requestsCpu: `${consumer.allocations.cpu.request}${consumer.allocations.cpu.requestType}`,
          limitsCpu: `${consumer.allocations.cpu.limit}${consumer.allocations.cpu.limitType}`,
          requestsMemory: `${consumer.allocations.memory.request}${consumer.allocations.memory.requestType}`,
          limitsMemory: `${consumer.allocations.memory.limit}${consumer.allocations.memory.limitType}`,
          resources: enabledResources,
          writeableResources: writeableResources,
          cacheDisabledResources: cacheDisabledResources,
        })
      }
    )
  )

  return requests;
}
