import {IConsumer} from "~/types/IConsumer";

export const mockConsumer: IConsumer = {
  components: {
    "utdanning vurdering": [
      {name: "Resource A", enabled: false, writeable: false, cacheDisabled: false},
      {name: "Resource B", enabled: false, writeable: false, cacheDisabled: false},
      {name: "Resource C", enabled: false, writeable: true, cacheDisabled: false}
    ],
    "utdanning elev": [
      {name: "Resource D", enabled: false, writeable: false, cacheDisabled: false},
      {name: "Resource E", enabled: false, writeable: true, cacheDisabled: false},
      {name: "Resource F", enabled: false, writeable: false, cacheDisabled: false}
    ],
    "utdanning utdanningsprogram": [
      {name: "Resource G", enabled: false, writeable: false, cacheDisabled: false},
      {name: "Resource H", enabled: false, writeable: false, cacheDisabled: false},
      {name: "Resource I", enabled: false, writeable: false, cacheDisabled: false}
    ]
  },
  organisations: [],
  version: "",
  shared: false,
  allocations: {
    memory: {
      request: "256",
      requestType: "Mi",
      limit: "512",
      limitType: "Mi"
    },
    cpu: {
      request: "100",
      requestType: "mm",
      limit: "500",
      limitType: "mm"
    }
  },
  writeableResources: [],
  cacheDisabledResources: []
};
