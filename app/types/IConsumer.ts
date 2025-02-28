export interface IConsumer {
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

export const emptyConsumer: IConsumer = {
  domain: "",
  package: "",
  version: "",
  org: "",
  shared: false,
  limitsCpu: "",
  limitsMemory: "",
  requestsCpu: "",
  requestsMemory: "",
  resources: [],
  writeableResources: [],
  cacheDisabledResources: []
};

