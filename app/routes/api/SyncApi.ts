import { type ApiResponse, NovariApiManager } from "novari-frontend-components";
import type { ISyncData } from "~/types";

const API_URL = import.meta.env.VITE_API_URL || "";
const apiManager = new NovariApiManager({
  baseUrl: API_URL,
});

class SyncApi {
  static async getAllSync(): Promise<ApiResponse<ISyncData[]>> {
    return await apiManager.call<ISyncData[]>({
      method: "GET",
      endpoint: "/api/sync",
      functionName: "getAllSync",
      customErrorMessage: "Kunne ikke hente synkroniseringer",
      customSuccessMessage: "Synkroniseringer hentet vellykket",
    });
  }
}

export default SyncApi;
