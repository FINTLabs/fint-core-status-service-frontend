import {useNavigate} from "react-router";
import {json, LoaderFunction} from "@remix-run/node";
import {StatusApi} from "~/api/StatusApi";
import {useLoaderData} from "@remix-run/react";
import {IStats} from "~/types/IStats";
import {formatStats} from "~/components/komponenter/Stats";
import {Box, Heading} from "@navikt/ds-react";
import {envCookie} from "~/components/cookie";
import {useEnv} from "~/constants/envContext";

export interface IEnvStats {
    api: IStats,
    beta: IStats,
    alpha: IStats
}

let currentCookie: string;

export const loader: LoaderFunction = async ({request}) => {
    const cookieHeader = request.headers.get("Cookie");
    currentCookie = await envCookie.parse(cookieHeader);
    try {
        const alpha: IStats = await StatusApi.getStats("alpha");
        const beta: IStats = await StatusApi.getStats("beta");
        const api: IStats = await StatusApi.getStats("api");

        return json({
            alpha: alpha,
            beta: beta,
            api: api
        })
    } catch (error) {
        console.error("Loader Error: ", error);
        throw new Response("Failed to load events", {status: 500});
    }
};


export default function Index() {
    const stats = useLoaderData<IEnvStats>();
    const { setEnv } = useEnv();
    console.log(currentCookie)
    useNavigate();
    return (
        <div>
            <Box className='p-5' onClick={() => setEnv("api")}>
                <Heading size={"medium"}>
                    Api
                </Heading>

                {formatStats(stats.api)}
            </Box>
            <Box className='p-3' onClick={() => setEnv("beta")}>
                <Heading size={"medium"}>
                    Beta
                </Heading>
                {formatStats(stats.beta)}
            </Box>
            <Box className='p-3'onClick={() => setEnv("alpha")}>
                <Heading size={"medium"}>
                    Alpha
                </Heading>
                {formatStats(stats.alpha)}
            </Box>
        </div>

    );
}
