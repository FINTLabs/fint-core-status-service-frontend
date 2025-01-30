import {IStats} from "~/types/IStats";
import {Box, HGrid, HStack} from "@navikt/ds-react";
import {
    ArrowRightLeftIcon,
    ArrowsSquarepathIcon,
    ExclamationmarkTriangleIcon,
    HeartIcon,
    TasklistIcon
} from "@navikt/aksel-icons";
import React from "react";


export function formatStats(stats: IStats) {
    console.log(stats)
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
                        <TasklistIcon title="Total Contracts" fontSize="1.5rem" style={{marginLeft: "20%"}}/>
                        {stats.adapterContractAmount}
                        <HeartIcon title="Healty heartbeats" fontSize="1.5rem" style={{marginLeft: "5%"}}/>
                        {stats.hasContectAmount}
                    </HStack>
                </Box>
            </a>
            <a href={"/hendelser"} style={{textDecoration: "none", color: "inherit"}}>
                <Box style={{
                    backgroundColor: "#eeeeee",
                    height: "200px",
                    borderRadius: "25px",
                    padding: "10px",
                    cursor: "pointer"
                }}>
                    <h1 style={{textAlign: "center"}}>
                        Eventer
                    </h1>
                    <HStack gap="1">
                        <ArrowRightLeftIcon title="Total requests" fontSize="1.5rem" style={{marginLeft: "10%"}}/>
                        {stats.eventAmount}
                        <ArrowsSquarepathIcon title="Total responses" fontSize="1.5rem" style={{marginLeft: "5%"}}/>
                        {stats.eventResponses}
                        <ExclamationmarkTriangleIcon title="Errors" fontSize="1.5rem" style={{marginLeft: "5%"}}/>
                        {stats.eventErrors}
                    </HStack>
                </Box>
            </a>
            <Box style={{
                backgroundColor: "#eeeeee",
                height: "200px",
                borderRadius: "25px",
                padding: "10px"
            }}>
                <h1 style={{textAlign: "center"}}>
                    Konsumere
                </h1>
                <p style={{marginLeft: "30%"}}>Will be added later</p>
            </Box>
        </HGrid>
    )

}