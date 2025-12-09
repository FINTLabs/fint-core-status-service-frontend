import { type ApiResponse, NovariApiManager } from "novari-frontend-components";
import { AuthProperties } from "~/utils/auth";
import type { IAdapter, IAdapterComponent, IContract } from "~/types";

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

//todo: remove this?
class AdapterApi {
  static async getAllAdapters(env: "beta" | "api" | "alpha" = "api"): Promise<ApiResponse<IAdapter[]>> {
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

    return await apiManager.call<IAdapter[]>({
      method: "GET",
      endpoint: `/component`,
      functionName: "getAllAdapters",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }

  static async getAdapterComponent(adapterId: string, componentId: string, env: "beta" | "api" | "alpha" = "api"): Promise<ApiResponse<IAdapterComponent[]>> {
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

    return await apiManager.call<IAdapterComponent[]>({
      method: "GET",
      endpoint: `/component/${adapterId}/${componentId}`,
      functionName: "getAdapterDetail",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }

  static async getAdapterComponentContract(adapterId: string, componentId: string, env: "beta" | "api" | "alpha" = "api"): Promise<ApiResponse<IContract[]>> {
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

    return await apiManager.call<IContract[]>({
      method: "GET",
      endpoint: `/contract/${adapterId}/${componentId}`,
      functionName: "getAdapterComponentContract",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }

  //TODO: add env to all api calls!
  static async getAdapterContract(env: "beta" | "api" | "alpha" = "api"): Promise<ApiResponse<IContract[]>> {
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

    const returnValue = await apiManager.call<IContract[]>({
      method: "GET",
      endpoint: `/contract/status`,
      functionName: "getAdapterContract",
      additionalHeaders: {
        Authorization: token,
      },
    });

    if (!returnValue.success && returnValue.status === 401) {
      return {
        success: false,
        message: "Unauthorized",
        data: [],
        variant: "warning",
      };
    }

    return returnValue;
  }
}
export default AdapterApi;
