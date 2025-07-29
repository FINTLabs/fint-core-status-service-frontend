import {IStats} from "~/types/IStats";
import {Box, Detail, Heading, HGrid, HStack, Label, ProgressBar, VStack} from "@navikt/ds-react";
import {
    ArrowRightLeftIcon,
    ArrowsSquarepathIcon,
    ExclamationmarkTriangleIcon,
    HeartIcon,
    TasklistIcon,
    SealCheckmarkFillIcon
} from "@navikt/aksel-icons";
import {Link} from '@remix-run/react';

export function DashboardStats(stats: IStats, env: string) {
    return (
        <Box>
            <HStack className={"w-full border-b-2 mb-4"} gap={"1"} align={"center"}>
                <SealCheckmarkFillIcon title="a11y-title" fontSize="1.5rem"/>
                <Heading size={"large"}>Miljø Oversikt - {env}</Heading>
            </HStack>
            <HGrid gap="6" columns={4}>
                <Link to={"/kontrakter"}>
                    <VStack gap={"4"}>
                        <Box padding={"4"} borderRadius='xlarge' background={"bg-subtle"}>
                            <Heading align="center" size="medium" spacing>
                                Kontrakter
                            </Heading>
                            <HStack align={"center"} justify={"space-between"} padding={"2"} className={"w-full"}>
                                <HStack>
                                    <HeartIcon title="Healty heartbeats" fontSize="1.5rem"/>
                                    <Label>
                                        {stats.hasContectAmount}
                                    </Label>
                                </HStack>
                                <HStack>
                                    <Label>
                                        {stats.adapterContractAmount} total
                                    </Label>
                                    <TasklistIcon title="Total Contracts"
                                                  fontSize="1.5rem"/>
                                </HStack>
                            </HStack>
                            <ProgressBar
                                size={"small"}
                                value={stats.hasContectAmount}
                                valueMax={stats.adapterContractAmount}
                                aria-label={"Kontakter progressbar"}
                            />
                        </Box>
                        <Box padding={"10"} borderRadius='xlarge' background={"bg-subtle"}>

                        </Box>
                    </VStack>
                </Link>
                <Link to={"/hendelser"}>
                    <Box padding={"10"} borderRadius='xlarge' background={"bg-subtle"}>
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
                <Box padding={"10"} borderRadius='xlarge' background={"bg-subtle"} className={"col-span-2"}>
                    <Heading align="center" size="medium">
                        Konsumere
                    </Heading>
                    <Detail style={{marginLeft: "30%"}}>Will be added later</Detail>
                </Box>
            </HGrid>
        </Box>
    )
}