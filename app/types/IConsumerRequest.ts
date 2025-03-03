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
