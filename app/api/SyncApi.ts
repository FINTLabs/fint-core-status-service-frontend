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

class SyncApi {
  static async getAllSync(env: "beta" | "api" | "alpha"): Promise<ApiResponse<ISyncData[]>> {
    const token = AuthProperties.getToken();
    switch (env) {
      case "beta":
        return await apiManagerBeta.call<ISyncData[]>({
          method: "GET",
          endpoint: "/page-metadata",
          functionName: "getAllSync",
          customErrorMessage: "Kunne ikke hente synkroniseringer",
          customSuccessMessage: "Synkroniseringer hentet vellykket",
          additionalHeaders: {
            Authorization: token,
          },
        });
      case "api":
        return await apiManagerApi.call<ISyncData[]>({
          method: "GET",
          endpoint: "/page-metadata",
          functionName: "getAllSync",
          customErrorMessage: "Kunne ikke hente synkroniseringer",
          customSuccessMessage: "Synkroniseringer hentet vellykket",
          additionalHeaders: {
            Authorization: token,
          },
        });
      case "alpha":
        return await apiManagerAlpha.call<ISyncData[]>({
          method: "GET",
          endpoint: "/page-metadata",
          functionName: "getAllSync",
          customErrorMessage: "Kunne ikke hente synkroniseringer",
          customSuccessMessage: "Synkroniseringer hentet vellykket",
          additionalHeaders: {
            Authorization: token,
          },
        });
      default:
        return {
          success: false,
          message: "Ukjent miljø",
          data: [],
          variant: "error",
        };
    }
  }
}

export default SyncApi;
