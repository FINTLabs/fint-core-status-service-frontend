import * as process from "process";
import { IFintEvent } from "~/types/IFintEvent";
import { IAdapterContract } from "~/types/IAdapterContract";
import { backendRoutesMap } from "~/api/backendRoutes";
import { HeaderProperties } from "~/components/root/HeaderProperties";
import { IStats } from "~/types/IStats";
import { toEnvKey } from "~/api/BackendConst";

const PROFILE = process.env.PROFILE;
const LOCAL_URL = process.env.PUBLIC_API_URL;
console.log("PROFILE:", PROFILE);

export class StatusApi {
  static async getResponse<T>(env: string, uri: string): Promise<T> {
    const response =
      PROFILE != null && PROFILE === "local"
        ? await this.performLocalRequest(uri)
        : await this.performRequest(env, uri);

    console.log("URL", uri);
    console.log("RESPONSE:", response);
    const json = await response.json();
    return json as T;
  }

  // static async getKonsumerTabs(env: string): Promise<IConsumerTab[]> {
  //   // TODO: Setup backend
  // }

  static async getHendelser(
    env: string,
    from: number | null,
    to: number | null
  ): Promise<IFintEvent[]> {
    const params: string[] = [];
    if (from != null && !isNaN(from)) {
      params.push(`from=${from}`);
    }
    if (to != null && !isNaN(to)) {
      params.push(`to=${to}`);
    }
    const queryString = params.length ? `?${params.join("&")}` : "";
    const url = `event${queryString}`;

    return this.getResponse<IFintEvent[]>(env, url);
  }

  static async getContracts(env: string): Promise<IAdapterContract[]> {
    return this.getResponse(env, "contract");
  }

  static async getStats(env: string): Promise<IStats> {
    return this.getResponse(env, "stats");
  }

  static async performRequest(env: string, uri: string) {
    const envKey = toEnvKey(env);

    if (!envKey) {
      throw new Error(`Invalid environment: ${env}`);
    }

    const baseUrl = backendRoutesMap[envKey];
    const normalizedUri = uri.startsWith("/") ? uri.slice(1) : uri;
    const requestUrl = `${baseUrl}/${normalizedUri}`;
    console.log("Requesting to: ", requestUrl);
    console.log("Env: ", env.toLowerCase());

    return await fetch(requestUrl, {
      method: "GET",
      headers: {
        Authorization: `${HeaderProperties.getBearerToken()}`,
        "Content-Type": "application/json",
      },
    });
  }

  static async performLocalRequest(uri: string) {
    return await fetch(`${LOCAL_URL}/${uri}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
  }
}
