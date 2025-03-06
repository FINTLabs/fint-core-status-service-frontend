import {IComponent} from "~/types/IComponent";

const utdanningVurdering: IComponent = {
  name: "utdanning vurdering",
  resources: [
    {name: "Resource A", enabled: false, writeable: true, cacheDisabled: false},
    {name: "Resource B", enabled: false, writeable: true, cacheDisabled: false},
    {name: "Resource C", enabled: false, writeable: true, cacheDisabled: false},
  ]
};

const utdanningElev: IComponent = {
  name: "utdanning elev",
  resources: [
    {name: "Resource D", enabled: false, writeable: true, cacheDisabled: false},
    {name: "Resource E", enabled: false, writeable: true, cacheDisabled: false},
    {name: "Resource F", enabled: false, writeable: true, cacheDisabled: false},
  ]
};

const utdanningUtdanningsprogram: IComponent = {
  name: "utdanning utdanningsprogram",
  resources: [
    {name: "Resource G", enabled: false, writeable: true, cacheDisabled: false},
    {name: "Resource H", enabled: false, writeable: true, cacheDisabled: false},
    {name: "Resource I", enabled: false, writeable: true, cacheDisabled: false},
  ]
};

export const MockResources: IComponent[] = [
  utdanningVurdering,
  utdanningElev,
  utdanningUtdanningsprogram
];
