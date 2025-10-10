import { http, HttpResponse } from "msw";
import adaptereData from "../fixtures/adaptere.json";
import adapterDetailData from "../fixtures/adapter-detail.json";
import adapterComponentDetailData from "../fixtures/adapter-component-detail.json";
import adapterComponentModalData from "../fixtures/adapter-component-modal.json";
import eventsData from "../fixtures/events.json";
import eventDetailData from "../fixtures/event-detail.json";

export const handlers = [
  // AdapterStatus API
  http.get("http://localhost:8080/api/adapters", () => {
    return HttpResponse.json(adaptereData);
  }),

  // Adapter detail API
  http.get("http://localhost:8080/api/adapters/:adapterId", ({ params }) => {
    const { adapterId: _adapterId } = params;
    return HttpResponse.json(adapterDetailData);
  }),

  // Adapter component detail API
  http.get("http://localhost:8080/api/adapters/:adapterId/:componentId", ({ params }) => {
    const { adapterId: _adapterId, componentId: _componentId } = params;
    return HttpResponse.json(adapterComponentDetailData);
  }),

  // Adapter component modal data API
  http.get(
    "http://localhost:8080/api/adapters/:adapterId/:componentId/:adapterName",
    ({ params }) => {
      const {
        adapterId: _adapterId,
        componentId: _componentId,
        adapterName: _adapterName,
      } = params;
      return HttpResponse.json(adapterComponentModalData);
    }
  ),

  // Events API
  http.get("http://localhost:8080/api/events", () => {
    return HttpResponse.json(eventsData);
  }),

  // Event detail API (for modal)
  http.get("http://localhost:8080/api/events/:eventId", ({ params }) => {
    const { eventId: _eventId } = params;
    return HttpResponse.json(eventDetailData);
  }),

  // Event detail API (new endpoint)
  http.get("http://localhost:8080/api/events/:eventId/detail", ({ params }) => {
    const { eventId: _eventId } = params;
    return HttpResponse.json(eventDetailData);
  }),
];
