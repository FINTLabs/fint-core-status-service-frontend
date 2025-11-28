import { type ApiResponse, NovariApiManager } from "novari-frontend-components";
import { AuthProperties } from "~/utils/auth";
import type { IAdapter } from "~/types";

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

//Note that endpoint is called component
class AdapterApi {
  static async getAllAdapters(env: "beta" | "api" | "alpha" = "api"): Promise<ApiResponse<IAdapter>> {
    const token = AuthProperties.getToken();
    const apiManager = apiManagers[env];

    if (!apiManager) {
      return {
        success: false,
        message: "Ukjent miljø",
        data: {},
        variant: "error",
      };
    }

    return await apiManager.call<IAdapter>({
      method: "GET",
      endpoint: `/component`,
      functionName: "getAllAdapters",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }
}
export default AdapterApi;
