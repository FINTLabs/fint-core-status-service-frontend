import {type ApiResponse, NovariApiManager } from 'novari-frontend-components';
import type {HendelserData} from "~/types";

const API_URL = import.meta.env.VITE_API_URL || '';
const apiManager = new NovariApiManager({
    baseUrl: API_URL,
});

class HendelserApi {
    static async getAllHendelser(): Promise<ApiResponse<HendelserData[]>> {
        return await apiManager.call<HendelserData[]>({
            method: 'GET',
            endpoint: '/api/hendelser',
            functionName: 'getAllHendelser',
            customErrorMessage: 'Kunne ikke hente hendelser',
            customSuccessMessage: 'Hendelser hentet vellykket'
        });
    }

    static async getHendelseDetail(hendelseId: string): Promise<ApiResponse<{
        request: any;
        response: any;
    }>> {
        return await apiManager.call<{
            request: any;
            response: any;
        }>({
            method: 'GET',
            endpoint: `/api/hendelser/${hendelseId}/detail`,
            functionName: 'getHendelseDetail',
            customErrorMessage: 'Kunne ikke hente hendelse detaljer',
            customSuccessMessage: 'Hendelse detaljer hentet vellykket'
        });
    }
}

export default HendelserApi;