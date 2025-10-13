import { http, HttpResponse } from "msw";
import adaptereData from "../fixtures/adaptere.json";
import adapterDetailData from "../fixtures/adapter-detail.json";
import adapterComponentDetailData from "../fixtures/adapter-component-detail.json";
import adapterComponentModalData from "../fixtures/adapter-component-modal.json";
import eventsData from "../fixtures/events.json";
import eventDetailData from "../fixtures/event-detail.json";
import syncData from "../fixtures/sync.json";

const BASE_URL = "http://localhost:8080";

export const handlers = [
  // AdapterStatus API
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
  http.get(`${BASE_URL}/api/sync`, () => {
    return HttpResponse.json(syncData);
  }),
];
