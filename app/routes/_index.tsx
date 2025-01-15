import {Box, HGrid, HStack, VStack} from "@navikt/ds-react";
import {useHref, useNavigate} from "react-router";
import React from "react";
import {json, LoaderFunction} from "@remix-run/node";
import {envCookie} from "~/components/cookie";
import {StatusApi} from "~/api/StatusApi";
import {useLoaderData} from "@remix-run/react";
import {Stats} from "~/types/Stats";
import {
    ArrowRightLeftIcon,
    ArrowsSquarepathIcon,
    ExclamationmarkTriangleIcon,
    HeartIcon,
    TasklistIcon
} from "@navikt/aksel-icons";

export const loader: LoaderFunction = async ({request}) => {
    const cookieHeader = request.headers.get("Cookie");
    const selectedEnv = await envCookie.parse(cookieHeader);
    try {
        const events = await StatusApi.getStats(selectedEnv);
        return json(events);
    } catch (error) {
        console.error("Loader Error: ", error);
        throw new Response("Failed to load events", {status: 500});
    }
};

export default function Index() {
    const stats = useLoaderData<Stats>();
    useNavigate();
    return (
        <HGrid gap="6" columns={3}>
            <a href={"/kontrakter"} style={{textDecoration: "none", color: "inherit"}}>
                <Box style={{
                    backgroundColor: "#eeeeee",
                    height: "200px",
                    borderRadius: "25px",
                    padding: "10px",
                    cursor: "pointer"
                }}>
                    <h1 style={{textAlign: "center"}}>
                        Adaptere
                    </h1>
                        <HStack gap="1">
                            <TasklistIcon title="a11y-title" fontSize="1.5rem" style={{marginLeft: "20%"}}/>
                            {stats.adapterContractAmount}
                            <HeartIcon title="a11y-title" fontSize="1.5rem" style={{marginLeft: "5%"}}/>
                            {stats.hasContectAmount}
                        </HStack>
                </Box>
            </a>
            <a href={"/hendelser"} style={{textDecoration: "none", color: "inherit"}}>
            <Box style={{backgroundColor: "#eeeeee",
                height: "200px",
                borderRadius: "25px",
                padding: "10px",
                cursor: "pointer"}}>
                <h1 style={{textAlign: "center"}}>
                    Eventer
                </h1>
                <HStack gap="1">
                    <ArrowRightLeftIcon title="a11y-title" fontSize="1.5rem" style={{marginLeft: "20%"}}/>
                    {stats.eventAmount}
                    <ArrowsSquarepathIcon title="a11y-title" fontSize="1.5rem" style={{marginLeft: "5%"}}/>
                    {stats.eventResponses}
                    <ExclamationmarkTriangleIcon title="a11y-title" fontSize="1.5rem" style={{marginLeft: "5%"}}/>
                    {stats.eventErrors}
                </HStack>
            </Box>
            </a>
            <Box style={{backgroundColor: "#eeeeee",
                height: "200px",
                borderRadius: "25px",
                padding: "10px"}}>
                <h1 style={{textAlign: "center"}}>
                    Konsumere
                </h1>
                <p style={{marginLeft: "30%"}}>Will be added later</p>
            </Box>
        </HGrid>
    );
}
