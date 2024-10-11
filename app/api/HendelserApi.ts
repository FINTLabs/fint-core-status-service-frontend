import {request} from "~/api/shared/api";
import {FintEvent} from "~/components/hendelser/event/FintEvent";

const API_URL = "http://localhost:8081";

export class HendelserApi {
    static async getHendelser(): Promise<FintEvent[]> {
        const URL = `${API_URL}/event`;
        return request(URL, "getHendelse");
    }
}
