import { type ApiResponse, NovariApiManager } from "novari-frontend-components";

import { AuthProperties } from "~/utils/auth";
import type { IStats } from "~/types/Stats";
import { backendRoutesMap } from "./backendRoutes.js";

const apiManagerBeta = new NovariApiManager({
  baseUrl: backendRoutesMap.beta,
});

const apiManagerApi = new NovariApiManager({
  baseUrl: backendRoutesMap.api,
});

const apiManagerAlpha = new NovariApiManager({
  baseUrl: backendRoutesMap.alpha,
});

const apiManagers = {
  beta: apiManagerBeta,
  api: apiManagerApi,
  alpha: apiManagerAlpha,
} as const;

class StatsApi {
  static async getStats(env: "beta" | "api" | "alpha"): Promise<ApiResponse<IStats>> {
    const token = AuthProperties.getToken();
    const apiManager = apiManagers[env];

    if (!apiManager) {
      return {
        success: false,
        message: "Ukjent miljø",
        data: undefined,
        variant: "error",
      };
    }

    return await apiManager.call<IStats>({
      method: "GET",
      endpoint: "/stats",
      functionName: "getStats",
      customErrorMessage: "Kunne ikke hente statistikk",
      customSuccessMessage: "Statistikk hentet vellykket",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }

  static async getAllStats(): Promise<{
    beta: Promise<ApiResponse<IStats>>;
    api: Promise<ApiResponse<IStats>>;
    alpha: Promise<ApiResponse<IStats>>;
  }> {
    return {
      beta: this.getStats("beta"),
      api: this.getStats("api"),
      alpha: this.getStats("alpha"),
    };
  }
}

export default StatsApi;

