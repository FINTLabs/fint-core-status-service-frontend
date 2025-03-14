import {IConsumerRequest} from "~/types/consumer/IConsumerRequest";

export const mockConsumerRequest: IConsumerRequest = {
  domain: "utdanning",
  package: "vurdering",
  version: "3.19.0",
  org: "fintlabs.no",
  shared: true,
  limitsCpu: "500m",
  limitsMemory: "512Mi",
  requestsCpu: "100m",
  requestsMemory: "256Mi",
  resources: ["elevfravar"],
  writeableResources: [],
  cacheDisabledResources: []
};