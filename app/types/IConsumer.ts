import {IResource} from "~/types/IComponent";

export interface IConsumer {
  components: Record<string, IResource[]>
  organisations: string[];
  version: string;
  shared: boolean;
  limitsCpu: string;
  limitsMemory: string;
  requestsCpu: string;
  requestsMemory: string;
  writeableResources: string[];
  cacheDisabledResources: string[];
}

export const emptyConsumer: IConsumer = {
  components: {},
  organisations: [],
  version: "",
  shared: false,
  limitsCpu: "500m",
  limitsMemory: "512Mi",
  requestsCpu: "100m",
  requestsMemory: "256Mi",
  writeableResources: [],
  cacheDisabledResources: []
};

