export interface IConsumer {
  components: string[]
  organisations: string[];
  version: string;
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
  components: [],
  organisations: [],
  version: "",
  shared: false,
  limitsCpu: "",
  limitsMemory: "",
  requestsCpu: "",
  requestsMemory: "",
  resources: [],
  writeableResources: [],
  cacheDisabledResources: []
};

