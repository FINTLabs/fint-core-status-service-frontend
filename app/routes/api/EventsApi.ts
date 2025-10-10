import { type ApiResponse, NovariApiManager } from "novari-frontend-components";
import type { IEventData, IEventDetail } from "~/types";

const API_URL = import.meta.env.VITE_API_URL || "";
const apiManager = new NovariApiManager({
  baseUrl: API_URL,
});

class EventsApi {
  static async getAllEvents(): Promise<ApiResponse<IEventData[]>> {
    return await apiManager.call<IEventData[]>({
      method: "GET",
      endpoint: "/api/events",
      functionName: "getAllEvents",
      customErrorMessage: "Kunne ikke hente hendelser",
      customSuccessMessage: "Hendelser hentet vellykket",
    });
  }

  static async getEventDetail(eventId: string): Promise<ApiResponse<IEventDetail>> {
    return await apiManager.call<IEventDetail>({
      method: "GET",
      endpoint: `/api/events/${eventId}/detail`,
      functionName: "getEventDetail",
      customErrorMessage: "Kunne ikke hente hendelse detaljer",
      customSuccessMessage: "Hendelse detaljer hentet vellykket",
    });
  }
}

export default EventsApi;
