import { http, HttpResponse } from "msw";
import adaptereData from "../../fixtures/adaptere.json";
import adapterDetailData from "../../fixtures/adapter-detail.json";
import adapterComponentDetailData from "../../fixtures/adapter-component.json";
import adapterComponentDetail from "../../fixtures/adapter-component-detail.json";
import adapterComponentModalData from "../../fixtures/adapter-component-modal.json";
import { BASE_URL } from "./constants";

export const adapterHandlers = [
  // Adapter API
  http.get(`${BASE_URL}/component`, () => {
    return HttpResponse.json(adaptereData);
  }),

  // Adapter detail API
  http.get(`${BASE_URL}/component/:adapterId`, () => {
    return HttpResponse.json(adapterDetailData);
  }),

  // Adapter component detail API
  // http.get(`${BASE_URL}/component/:adapterId/:componentId`, () => {
  http.get(`${BASE_URL}/component/agderfk.no/utdanning`, () => {
    return HttpResponse.json(adapterComponentDetailData);
  }),

  // Adapter component modal data API
  http.get(`${BASE_URL}/component/:adapterId/:componentId/:adapterName`, () => {
    return HttpResponse.json(adapterComponentModalData);
  }),

  http.get(`${BASE_URL}/contract/agderfk.no/utdanning`, () => {
    return HttpResponse.json(adapterComponentDetail);
  }),
];
