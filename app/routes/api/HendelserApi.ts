import { type ApiResponse, NovariApiManager } from "novari-frontend-components";
import type { IEventData, IEventDetail } from "~/types";

const API_URL = import.meta.env.VITE_API_URL || "";
const apiManager = new NovariApiManager({
  baseUrl: API_URL,
});

// API response type that supports both Norwegian and English property names
interface EventApiResponse {
  eventId?: string;
  hendelseId?: string;
  operation?: "CREATE" | "UPDATE" | "DELETE";
  operasjon?: "CREATE" | "UPDATE" | "DELETE";
  organization?: string;
  organisasjon?: string;
  resources?: string;
  ressurser?: string;
  status: "ok" | "error";
  transferred?: string;
  overført?: string;
  transportType?: string;
}

// Transform Norwegian API response to English interface
function transformEventData(data: EventApiResponse): IEventData {
  return {
    eventId: data.eventId || data.hendelseId || "",
    operation: data.operation || data.operasjon || "CREATE",
    organization: data.organization || data.organisasjon || "",
    resources: data.resources || data.ressurser || "",
    status: data.status,
    transferred: data.transferred || data.overført || "",
    transportType: data.transportType,
  };
}

class EventsApi {
  static async getAllEvents(): Promise<ApiResponse<IEventData[]>> {
    const response = await apiManager.call<EventApiResponse[]>({
      method: "GET",
      endpoint: "/api/hendelser",
      functionName: "getAllEvents",
      customErrorMessage: "Kunne ikke hente hendelser",
      customSuccessMessage: "Hendelser hentet vellykket",
    });

    // Transform the data to ensure English property names
    if (response.data) {
      response.data = response.data.map(transformEventData);
    }

    return response as ApiResponse<IEventData[]>;
  }

  static async getEventDetail(eventId: string): Promise<ApiResponse<IEventDetail>> {
    return await apiManager.call<IEventDetail>({
      method: "GET",
      endpoint: `/api/hendelser/${eventId}/detail`,
      functionName: "getEventDetail",
      customErrorMessage: "Kunne ikke hente hendelse detaljer",
      customSuccessMessage: "Hendelse detaljer hentet vellykket",
    });
  }
}

export default EventsApi;
