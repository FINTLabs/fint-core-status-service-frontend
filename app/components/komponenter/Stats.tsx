import {IStats} from "~/types/IStats";
import {Box, Detail, Heading, HGrid, HStack} from "@navikt/ds-react";
import {
    ArrowRightLeftIcon,
    ArrowsSquarepathIcon,
    ExclamationmarkTriangleIcon,
    HeartIcon,
    TasklistIcon
} from "@navikt/aksel-icons";
import { Link } from '@remix-run/react';


export function formatStats(stats: IStats) {
    return (
        <HGrid gap="6" columns={{ xs: 1, sm: 1, md: 3 }}>
            <Link to={"/kontrakter"}>
            {/*<a href={"/kontrakter"} style={{textDecoration: "none", color: "inherit"}}>*/}
                <Box padding={"10"} height={"200"} borderRadius='xlarge' background={"bg-subtle"} >
                    <Heading align="center" size="medium">
                        Adaptere
                    </Heading>
                    <HStack gap="1">
                        <TasklistIcon title="Total Contracts" fontSize="1.5rem" style={{marginLeft: "20%"}}/>
                        {stats.adapterContractAmount}
                        <HeartIcon title="Healty heartbeats" fontSize="1.5rem" style={{marginLeft: "5%"}}/>
                        {stats.hasContectAmount}
                    </HStack>
                </Box></Link>
            {/*</a>*/}
            {/*<a href={"/hendelser"} style={{textDecoration: "none", color: "inherit"}}>*/}
            <Link to={"/hendelser"}>
                <Box padding={"10"} height={"200"} borderRadius='xlarge' background={"bg-subtle"} >
                    <Heading align="center" size="medium">
                        Eventer
                    </Heading>
                    <HStack gap="1">
                        <ArrowRightLeftIcon title="Total requests" fontSize="1.5rem" style={{marginLeft: "10%"}}/>
                        {stats.eventAmount}
                        <ArrowsSquarepathIcon title="Total responses" fontSize="1.5rem" style={{marginLeft: "5%"}}/>
                        {stats.eventResponses}
                        <ExclamationmarkTriangleIcon title="Errors" fontSize="1.5rem" style={{marginLeft: "5%"}}/>
                        {stats.eventErrors}
                    </HStack>
                </Box>
            {/*</a>*/}
            </Link>
            <Box padding={"10"} height={"200"} borderRadius='xlarge' background={"bg-subtle"} >
                <Heading align="center" size="medium">
                    Konsumere
                </Heading>
                <Detail style={{marginLeft: "30%"}}>Will be added later</Detail>
            </Box>
        </HGrid>
    )

}