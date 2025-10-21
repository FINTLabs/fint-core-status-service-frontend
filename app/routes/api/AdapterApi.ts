import { type ApiResponse, NovariApiManager } from "novari-frontend-components";
import type {
  IAdapterComponentData,
  IAdapterDetailData,
  IAdaptereData,
  IAdapterComponentModalData,
} from "~/types";
import { AuthProperties } from "~/utils/auth";

const API_URL = import.meta.env.VITE_API_URL || "";
const apiManager = new NovariApiManager({
  baseUrl: API_URL,
});

class ContactApi {
  static async getAllAdapters(): Promise<ApiResponse<IAdaptereData[]>> {
    const token = AuthProperties.getToken();
    return await apiManager.call<IAdaptereData[]>({
      method: "GET",
      endpoint: `/contract`,
      functionName: "getAllAdapters",
      customErrorMessage: "Kunne ikke hente adaptere",
      customSuccessMessage: "Hentet adaptere vellykket",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }

  static async getAdapterDetail(adapterId: string): Promise<ApiResponse<IAdapterDetailData[]>> {
    const token = AuthProperties.getToken();
    return await apiManager.call<IAdapterDetailData[]>({
      method: "GET",
      endpoint: `/api/adapters/${adapterId}`,
      functionName: "getAdapterDetail",
      customErrorMessage: "Kunne ikke hente detaljene",
      customSuccessMessage: "Hentet vellykket",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }

  static async getAdapterComponentDetail(
    adapterId: string,
    componentId: string
  ): Promise<ApiResponse<IAdapterComponentData[]>> {
    return await apiManager.call<IAdapterComponentData[]>({
      method: "GET",
      endpoint: `/api/adapters/${adapterId}/${componentId}`,
      functionName: "getAdapterComponentDetail",
      customErrorMessage: "Kunne ikke hente detaljene",
      customSuccessMessage: "Hentet vellykket",
    });
  }

  static async getAdapterComponentModalData(
    adapterId: string,
    componentId: string,
    adapterName: string
  ): Promise<ApiResponse<IAdapterComponentModalData>> {
    const token = AuthProperties.getToken();
    return await apiManager.call<IAdapterComponentModalData>({
      method: "GET",
      endpoint: `/api/adapters/${adapterId}/${componentId}/${adapterName}`,
      functionName: "getAdapterComponentModalData",
      customErrorMessage: "Kunne ikke hente adapter detaljer",
      customSuccessMessage: "Hentet vellykket",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }
}

export default ContactApi;
