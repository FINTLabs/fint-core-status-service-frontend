import * as process from "process";
import {IFintEvent} from "~/types/IFintEvent";
import {IAdapterContract} from "~/types/IAdapterContract";
import {IStats} from "~/types/IStats";
import {getResponse} from "~/api/shared/api";

const PROFILE = process.env.PROFILE;
console.log("PROFILE:", PROFILE);

export class StatusApi {
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

    return getResponse<IFintEvent[]>(env, url);
  }

  static async getContracts(env: string): Promise<IAdapterContract[]> {
    return getResponse(env, "contract");
  }

  static async getInactiveContracts(env: string): Promise<IAdapterContract[]> {
    return getResponse(env, "contract/inactive");
  }

  static async getStats(env: string): Promise<IStats> {
    return getResponse(env, "stats");
  }

}
