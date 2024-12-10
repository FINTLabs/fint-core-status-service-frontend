import * as process from "process";
import {FintEvent} from "~/types/Event";
import {AdapterContract} from "~/types/AdapterContract";

const API_URL = `${process.env.PUBLIC_API_URL}`;

export class StatusApi {
  static async getHendelser(env: string): Promise<FintEvent[]> {
    const requestUrl = `${API_URL}/event`

    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json()
  }

  static async getContracts(env: string): Promise<AdapterContract[]> {
    const requestUrl = `${API_URL}/contract`

    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PUBLIC_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json()
  }

}