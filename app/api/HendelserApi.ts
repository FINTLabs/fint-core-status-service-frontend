import {request} from "~/api/shared/api";
import {FintEvent} from "~/components/hendelser/event/FintEvent";
import * as process from "process";

const API_URL = process.env.PUBLIC_API_URL;
const token = process.env.PUBLIC_TOKEN;

export class HendelserApi {
    private static url: string = API_URL+"/event";
    static async getHendelser(): Promise<FintEvent[]> {

        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        console.log(this.url)

        return request(this.url, "getHendelser", "GET", "json", undefined, { headers });
    }
}