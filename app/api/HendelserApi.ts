import * as process from "process";
import {FintEvent} from "~/types/Event";

const API_URL = `${process.env.PUBLIC_API_URL}/api`;

export class HendelserApi {
  static async getHendelser(env: string): Promise<FintEvent[]> {
    const requestUrl = `${API_URL}/${env}/event`

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