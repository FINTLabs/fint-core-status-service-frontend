import { type ApiResponse, NovariApiManager } from "novari-frontend-components";
import type {
  IAdapterComponentData,
  IAdapterDetailData,
  IAdaptereData,
  IAdapterComponentModalData,
} from "~/types";
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

class AdapterApi {
  static async getAllAdapters(
    env: "beta" | "api" | "alpha" = "api"
  ): Promise<ApiResponse<IAdaptereData[]>> {
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

    return await apiManager.call<IAdaptereData[]>({
      method: "GET",
      endpoint: `/api/adapters`,
      functionName: "getAllAdapters",
      customErrorMessage: "Kunne ikke hente adaptere",
      customSuccessMessage: "Hentet adaptere vellykket",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }

  static async getAdapterDetail(
    adapterId: string,
    env: "beta" | "api" | "alpha" = "api"
  ): Promise<ApiResponse<IAdapterDetailData[]>> {
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
    componentId: string,
    env: "beta" | "api" | "alpha" = "api"
  ): Promise<ApiResponse<IAdapterComponentData[]>> {
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

    return await apiManager.call<IAdapterComponentData[]>({
      method: "GET",
      endpoint: `/api/adapters/${adapterId}/${componentId}`,
      functionName: "getAdapterComponentDetail",
      customErrorMessage: "Kunne ikke hente detaljene",
      customSuccessMessage: "Hentet vellykket",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }

  static async getAdapterComponentModalData(
    adapterId: string,
    componentId: string,
    adapterName: string,
    env: "beta" | "api" | "alpha" = "api"
  ): Promise<ApiResponse<IAdapterComponentModalData>> {
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

export default AdapterApi;
