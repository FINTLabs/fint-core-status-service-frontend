import { type ApiResponse, NovariApiManager } from "novari-frontend-components";
import type { IEventData, IEventDetail } from "~/types";
import { AuthProperties } from "~/utils/auth";

const API_URL = import.meta.env.VITE_API_URL || "";
const apiManager = new NovariApiManager({
  baseUrl: API_URL,
});

class EventsApi {
  static async getAllEvents(): Promise<ApiResponse<IEventData[]>> {
    const token = AuthProperties.getToken();
    return await apiManager.call<IEventData[]>({
      method: "GET",
      endpoint: "/api/events",
      functionName: "getAllEvents",
      customErrorMessage: "Kunne ikke hente hendelser",
      customSuccessMessage: "Hendelser hentet vellykket",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }

  static async getEventDetail(eventId: string): Promise<ApiResponse<IEventDetail>> {
    const token = AuthProperties.getToken();
    return await apiManager.call<IEventDetail>({
      method: "GET",
      endpoint: `/api/events/${eventId}/detail`,
      functionName: "getEventDetail",
      customErrorMessage: "Kunne ikke hente hendelse detaljer",
      customSuccessMessage: "Hendelse detaljer hentet vellykket",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }
}

export default EventsApi;
