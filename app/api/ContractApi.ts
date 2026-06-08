import { type ApiResponse, NovariApiManager } from "novari-frontend-components";
import { AuthProperties } from "~/utils/auth";
import type {
  IContractStatus,
  IContractDomain,
  IContractComponent,
} from "~/types";
import { backendRoutesMap } from "./backendRoutes.js";

const CONTRACT_DOMAIN_RETRY_ATTEMPTS = 3;
const CONTRACT_DOMAIN_RETRY_DELAY_MS = 750;

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

const wait = (delayMs: number) =>
  new Promise((resolve) => setTimeout(resolve, delayMs));

function isRetryableResponse<T>(response: ApiResponse<T>) {
  if (response.success) {
    return false;
  }

  if (!response.status) {
    return true;
  }

  return (
    response.status === 408 || response.status === 429 || response.status >= 500
  );
}

async function callWithRetry<T>(
  callApi: () => Promise<ApiResponse<T>>,
  attempts = CONTRACT_DOMAIN_RETRY_ATTEMPTS,
): Promise<ApiResponse<T>> {
  let response = await callApi();

  for (
    let attempt = 1;
    attempt < attempts && isRetryableResponse(response);
    attempt += 1
  ) {
    await wait(CONTRACT_DOMAIN_RETRY_DELAY_MS * attempt);
    response = await callApi();
  }

  return response;
}

class ContractApi {
  static async getContractStatus(
    env: "beta" | "api" | "alpha" = "api",
  ): Promise<ApiResponse<IContractStatus[]>> {
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

    const returnValue = await apiManager.call<IContractStatus[]>({
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

  // /contract/fintlabs.no/domain/personvern
  static async getContractDomain(
    orgId: string,
    domainId: string,
    env: "beta" | "api" | "alpha" = "api",
  ): Promise<ApiResponse<IContractDomain[]>> {
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

    return await callWithRetry(() =>
      apiManager.call<IContractDomain[]>({
        method: "GET",
        endpoint: `/contract/${orgId}/domain/${domainId}`,
        functionName: "getAdapterContractDetail",
        additionalHeaders: {
          Authorization: token,
        },
      }),
    );
  }

  // /contract/fintlabs.no/component/personvern-samtykke
  static async getContractComponent(
    domainId: string,
    componentId: string,
    env: "beta" | "api" | "alpha" = "api",
  ): Promise<ApiResponse<IContractComponent[]>> {
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

    return await apiManager.call<IContractComponent[]>({
      method: "GET",
      endpoint: `/contract/${domainId}/component/${componentId}`,
      functionName: "getAdapterComponentContract",
      additionalHeaders: {
        Authorization: token,
      },
    });
  }
}

export default ContractApi;
