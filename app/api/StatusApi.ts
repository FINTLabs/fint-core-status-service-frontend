import * as process from "process";
import {FintEvent} from "~/types/Event";
import {AdapterContract} from "~/types/AdapterContract";
import {backendRoutesMap} from "~/api/backendRoutes";
import {HeaderProperties} from "~/components/root/HeaderProperties";
import {IStats} from "~/types/IStats";
import {IConsumerTab} from "~/types/IConsumerTab";

const PROFILE = process.env.PROFILE;
const LOCAL_URL = process.env.PUBLIC_API_URL;
console.log("PROFILE:", PROFILE);

export class StatusApi {

  static async getResponse(env: string, uri: string) {
    const response =
      PROFILE != null && PROFILE === "local"
        ? await this.performLocalRequest(uri)
        : await this.performRequest(env, uri);

    return await response.json();
  }

  static async getKonsumerTabs(env: string): Promise<IConsumerTab[]> {
    // TODO: Setup backend
  }

  static async getHendelser(env: string, from: number | null, to: number | null): Promise<FintEvent[]> {
    const params: string[] = [];
    if (from != null && !isNaN(from)) {
      params.push(`from=${from}`);
    }
    if (to != null && !isNaN(to)) {
      params.push(`to=${to}`);
    }
    const queryString = params.length ? `?${params.join('&')}` : '';
    const url = `event${queryString}`;

    return this.getResponse(env, url);
  }

  static async getContracts(env: string): Promise<AdapterContract[]> {
    return this.getResponse(env, "contract");
  }

  static async getStats(env: string): Promise<IStats> {
    return this.getResponse(env, "stats");
  }

  static async performRequest(env: string, uri: string) {
    const requestUrl = `${backendRoutesMap[env.toLowerCase()]}/${uri}`;
    console.log("Requesting to: ", requestUrl)
    console.log("Env: ", env.toLowerCase())

    return await fetch(requestUrl, {
      method: "GET",
      headers: {
        Authorization: `${HeaderProperties.getBearerToken()}`,
        "Content-Type": "application/json",
      },
    });
  }

  static async performLocalRequest(uri) {
    return await fetch(`${LOCAL_URL}/${uri}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
  }
}
