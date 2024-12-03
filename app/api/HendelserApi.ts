import {request} from "~/api/shared/api";
import {FintEvent} from "~/components/hendelser/event/FintEvent";
import * as process from "process";

const API_URL = process.env.PUBLIC_API_URL;

export class HendelserApi {
  static async getHendelser(): Promise<FintEvent[]> {
    const URL = `${API_URL}/event`;
    return request(URL, "getHendelse");
  }
}
