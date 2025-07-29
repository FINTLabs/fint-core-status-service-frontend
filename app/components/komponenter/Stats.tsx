import {IStats} from "~/types/IStats";
import {Box, Detail, Heading, HGrid, HStack} from "@navikt/ds-react";
import {
    ArrowRightLeftIcon,
    ArrowsSquarepathIcon,
    ExclamationmarkTriangleIcon,
    HeartIcon,
    TasklistIcon,
    SealCheckmarkFillIcon
} from "@navikt/aksel-icons";
import {Link} from '@remix-run/react';

export function formatStats(stats: IStats, env: string) {
    return (
        <Box>
            <HStack className={"w-full border-b-2 mb-4"} align={"center"}>
                <SealCheckmarkFillIcon title="a11y-title" fontSize="1.5rem"/>
                <Heading size={"large"}>Miljø Oversikt - {env}</Heading>
            </HStack>
            <HGrid gap="6" columns={3}>
                <Link to={"/kontrakter"}>
                    <Box padding={"10"} height={"200"} borderRadius='xlarge' background={"bg-subtle"}>
                        <Heading align="center" size="medium">
                            Kontrakter
                        </Heading>
                        <HStack gap="1">
                            <TasklistIcon title="Total Contracts" fontSize="1.5rem" style={{marginLeft: "20%"}}/>
                            {stats.adapterContractAmount}
                            <HeartIcon title="Healty heartbeats" fontSize="1.5rem" style={{marginLeft: "5%"}}/>
                            {stats.hasContectAmount}
                        </HStack>
                    </Box></Link>
                <Link to={"/hendelser"}>
                    <Box padding={"10"} height={"200"} borderRadius='xlarge' background={"bg-subtle"}>
                        <Heading align="center" size="medium">
                            Hendelser
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
                </Link>
                <Box padding={"10"} height={"200"} borderRadius='xlarge' background={"bg-subtle"}>
                    <Heading align="center" size="medium">
                        Konsumere
                    </Heading>
                    <Detail style={{marginLeft: "30%"}}>Will be added later</Detail>
                </Box>
            </HGrid>
        </Box>
    )
}