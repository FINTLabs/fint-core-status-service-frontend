import { http, HttpResponse, delay } from "msw";
import adaptereData from "../fixtures/adaptere.json";
import adapterDetailData from "../fixtures/adapter-detail.json";
import adapterComponentDetailData from "../fixtures/adapter-component-detail.json";
import adapterComponentModalData from "../fixtures/adapter-component-modal.json";
import eventsData from "../fixtures/events.json";
import eventDetailData from "../fixtures/event-detail.json";
import syncData from "../fixtures/sync.json";
import syncDataApi from "../fixtures/sync-api.json";

const BASE_URL = "http://localhost:8080";
const BETA_API_URL = "http://localhost:8081";

export const handlers = [
  // Adapter API
  http.get(`${BASE_URL}/api/adapters`, () => {
    return HttpResponse.json(adaptereData);
  }),

  // Adapter detail API
  http.get(`${BASE_URL}/api/adapters/:adapterId`, () => {
    return HttpResponse.json(adapterDetailData);
  }),

  // Adapter component detail API
  http.get(`${BASE_URL}/api/adapters/:adapterId/:componentId`, () => {
    return HttpResponse.json(adapterComponentDetailData);
  }),

  // Adapter component modal data API
  http.get(`${BASE_URL}/api/adapters/:adapterId/:componentId/:adapterName`, () => {
    return HttpResponse.json(adapterComponentModalData);
  }),

  // Events API
  http.get(`${BASE_URL}/api/events`, () => {
    return HttpResponse.json(eventsData);
  }),

  // Event detail API (for modal)
  http.get(`${BASE_URL}/api/events/:eventId`, () => {
    return HttpResponse.json(eventDetailData);
  }),

  // Event detail API (new endpoint)
  http.get(`${BASE_URL}/api/events/:eventId/detail`, () => {
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
