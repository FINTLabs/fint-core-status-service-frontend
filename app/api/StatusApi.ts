import * as process from "process";
import {FintEvent} from "~/types/Event";
import {AdapterContract} from "~/types/AdapterContract";
import {backendRoutesMap} from "~/api/backendRoutes";
import {HeaderProperties} from "~/components/root/HeaderProperties";

const PROFILE = process.env.PROFILE

export class StatusApi {
  static async getHendelser(env: string): Promise<FintEvent[]> {
    const requestUrl = `${backendRoutesMap[env.toLowerCase()]}/event`
    return this.getResponse(requestUrl)
  }

  static async getContracts(env: string): Promise<AdapterContract[]> {
    const requestUrl = `${backendRoutesMap[env.toLowerCase()]}/contract`
    return this.getResponse(requestUrl)
  }

  static async getResponse(requestUrl) {
    const response = PROFILE === 'local'
      ? await this.performRequest(requestUrl)
      : await this.performLocalRequest()

    return await response.json()
  }

  static async performRequest(requestUrl: string) {
    return await fetch(requestUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${HeaderProperties.getBearerToken()}`,
        'Content-Type': 'application/json',
      },
    });
  }

  static async performLocalRequest() {
    return await fetch(process.env.PUBLIC_API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
  }

}