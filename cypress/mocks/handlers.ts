import { http, HttpResponse, delay } from "msw";
import adaptereData from "../fixtures/adaptere.json";
import adapterDetailData from "../fixtures/adapter-detail.json";
import adapterComponentDetailData from "../fixtures/adapter-component.json";
import adapterComponentDetail from "../fixtures/adapter-component-detail.json";
import adapterComponentModalData from "../fixtures/adapter-component-modal.json";
import eventsData from "../fixtures/events.json";
import eventDetailData from "../fixtures/event-detail.json";
import syncData from "../fixtures/sync.json";
import syncDataApi from "../fixtures/sync-api.json";

const BASE_URL = "http://localhost:8080";
const BETA_API_URL = "http://localhost:8080";

export const handlers = [
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

  // Events API
  http.get(`${BASE_URL}/event`, () => {
    return HttpResponse.json(eventsData);
  }),

  // Event detail API (for modal)
  http.get(`${BASE_URL}/event/:eventId`, () => {
    return HttpResponse.json(eventDetailData);
  }),

  // Event detail API (new endpoint)
  http.get(`${BASE_URL}/event/:eventId/detail`, () => {
    return HttpResponse.json(eventDetailData);
  }),

  // Sync API
  http.get(`${BASE_URL}/page-metadata`, async () => {
    await delay(5000);
    return HttpResponse.json(syncData);
  }),

  http.get(`${BETA_API_URL}/page-metadata`, async () => {
    await delay(5000);
    return HttpResponse.json(syncDataApi);
  }),
];
