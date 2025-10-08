import { type ApiResponse, NovariApiManager } from "novari-frontend-components";
import type { IAdaptereData } from "~/types";

const API_URL = import.meta.env.VITE_API_URL || "";
const apiManager = new NovariApiManager({
  baseUrl: API_URL,
});

class ContactApi {
  static async getAllAdapters(): Promise<ApiResponse<IAdaptereData[]>> {
    return await apiManager.call<IAdaptereData[]>({
      method: "GET",
      endpoint: "/api/adapters",
      functionName: "getAllAdapters",
      customErrorMessage: "Kunne ikke hente en liste",
      customSuccessMessage: "Hentet vellykket",
    });
  }
}

export default ContactApi;
