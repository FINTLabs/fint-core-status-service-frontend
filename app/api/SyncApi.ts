import { type ApiResponse, NovariApiManager } from "novari-frontend-components";
import type { ISyncData } from "~/types";
import { AuthProperties } from "~/utils/auth";

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

class SyncApi {
  static async getAllSync(env: "beta" | "api" | "alpha"): Promise<ApiResponse<ISyncData[]>> {
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

    return await apiManager.call<ISyncData[]>({
      method: "GET",
      endpoint: "/page-metadata",
      functionName: "getAllSync",
      customErrorMessage: "Kunne ikke hente synkroniseringer",
      customSuccessMessage: "Synkroniseringer hentet vellykket",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }
}

export default SyncApi;
