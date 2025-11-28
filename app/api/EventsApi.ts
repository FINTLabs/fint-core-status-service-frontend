import { type ApiResponse, NovariApiManager } from "novari-frontend-components";

import { AuthProperties } from "~/utils/auth";
import type { IEvent } from "~/types/Event";

const API_URL = import.meta.env.VITE_API_URL || "";
const BETA_API_URL = import.meta.env.VITE_BETA_URL || "";

const apiManagerBeta = new NovariApiManager({
  baseUrl: BETA_API_URL,
});

const apiManagerApi = new NovariApiManager({
  baseUrl: API_URL,
});

const apiManagerAlpha = new NovariApiManager({
  baseUrl: API_URL,
});

const apiManagers = {
  beta: apiManagerBeta,
  api: apiManagerApi,
  alpha: apiManagerAlpha,
} as const;

class EventsApi {
  static async getAllEvents(env: "beta" | "api" | "alpha" = "api"): Promise<ApiResponse<IEvent[]>> {
    const token = AuthProperties.getToken();
    const apiManager = apiManagers[env];

    if (!apiManager) {
      return {
        success: false,
        message: "Ukjent miljø",
        data: [],
        variant: "error",
      };
    }

    return await apiManager.call<IEvent[]>({
      method: "GET",
      endpoint: "/event",
      functionName: "getAllEvents",
      customErrorMessage: "Kunne ikke hente hendelser",
      customSuccessMessage: "Hendelser hentet vellykket",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }

  // static async getEventDetail(
  //   eventId: string,
  //   env: "beta" | "api" | "alpha" = "api"
  // ): Promise<ApiResponse<IEventDetail>> {
  //   const token = AuthProperties.getToken();
  //   const apiManager = apiManagers[env];
  //
  //   if (!apiManager) {
  //     return {
  //       success: false,
  //       message: "Ukjent miljø",
  //       data: undefined,
  //       variant: "error",
  //     };
  //   }
  //
  //   return await apiManager.call<IEventDetail>({
  //     method: "GET",
  //     endpoint: `/event/${eventId}/detail`,
  //     functionName: "getEventDetail",
  //     customErrorMessage: "Kunne ikke hente hendelse detaljer",
  //     customSuccessMessage: "Hendelse detaljer hentet vellykket",
  //     additionalHeaders: {
  //       Authorization: token,
  //     },
  //   });
  // }
}

export default EventsApi;
