import {IResources} from "~/types/IResources";

export const mockResources: IResources[] = [
  utdanningVurdering,
  utdanningElev,
  utdanningUtdanningsprogram
];

const utdanningVurdering: IResources = {
  component: "utdanning vurdering",
  resources: [
    { name: "Resource A", enabled: false, writeable: true, cacheDisabled: false },
    { name: "Resource B", enabled: false, writeable: true, cacheDisabled: false },
    { name: "Resource C", enabled: false, writeable: true, cacheDisabled: false },
  ]
};

const utdanningElev: IResources = {
  component: "utdanning elev",
  resources: [
    { name: "Resource D", enabled: false, writeable: true, cacheDisabled: false },
    { name: "Resource E", enabled: false, writeable: true, cacheDisabled: false },
    { name: "Resource F", enabled: false, writeable: true, cacheDisabled: false },
  ]
};

const utdanningUtdanningsprogram: IResources = {
  component: "utdanning utdanningsprogram",
  resources: [
    { name: "Resource G", enabled: false, writeable: true, cacheDisabled: false },
    { name: "Resource H", enabled: false, writeable: true, cacheDisabled: false },
    { name: "Resource I", enabled: false, writeable: true, cacheDisabled: false },
  ]
};

