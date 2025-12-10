import { http, HttpResponse } from "msw";
import statsData from "../../fixtures/stats.json";
import { BASE_URL, API_URL, ALPHA_URL } from "./constants";

export const statsHandlers = [
  // Stats API - Beta
  http.get(`${BASE_URL}/stats`, () => {
    return HttpResponse.json(statsData);
  }),

  // Stats API - API
  http.get(`${API_URL}/stats`, () => {
    return HttpResponse.json(statsData);
  }),

  // Stats API - Alpha
  http.get(`${ALPHA_URL}/stats`, () => {
    return HttpResponse.json(statsData);
  }),
];

