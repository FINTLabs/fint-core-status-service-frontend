import {useNavigate} from "react-router";
import {LoaderFunction} from "@remix-run/node";
import {StatusApi} from "~/api/StatusApi";
import {useLoaderData} from "@remix-run/react";
import {IStats} from "~/types/IStats";
import {DashboardStats} from "~/components/komponenter/DashboardStats";
import {Box} from "@navikt/ds-react";
import {envCookie} from "~/components/cookie";
import {useEnv} from "~/constants/envContext";

export interface IEnvStats {
    api: IStats;
    beta: IStats;
    alpha: IStats;
}

let currentCookie: string;

export const loader: LoaderFunction = async ({request}) => {
    const cookieHeader = request.headers.get("Cookie");
    currentCookie = await envCookie.parse(cookieHeader);

    try {
        const alpha: IStats = await StatusApi.getStats("alpha");
        const beta: IStats = await StatusApi.getStats("beta");
        const api: IStats = await StatusApi.getStats("api");

        return new Response(
            JSON.stringify({alpha, beta, api}),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Loader Error: ", error);
        return new Response(
            JSON.stringify({alpha: null, beta: null, api: null}),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
};

export default function Index() {
    const stats = useLoaderData<IEnvStats>();
    const {setEnv} = useEnv();
    console.log(currentCookie);
    useNavigate();

    return (
        <div className={"pt-4 flex flex-col w-full"}>
            <Box className="p-5" onClick={() => setEnv("api")}>
                {stats.api ? DashboardStats(stats.api, "Api") : <p>No data available</p>}
            </Box>
            <Box className="p-3" onClick={() => setEnv("beta")}>
                {stats.beta ? DashboardStats(stats.beta, "Beta") : <p>No data available</p>}
            </Box>
            <Box className="p-3" onClick={() => setEnv("alpha")}>
                {stats.alpha ? DashboardStats(stats.alpha, "Alpha") : <p>No data available</p>}
            </Box>
        </div>
    );
}
