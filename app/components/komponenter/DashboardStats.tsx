import {IStats} from "~/types/IStats";
import {Box, Detail, Heading, HGrid, HStack, Label, VStack} from "@navikt/ds-react";
import {
    ArrowRightLeftIcon,
    ArrowsSquarepathIcon,
    ExclamationmarkTriangleIcon,
    HeartIcon,
    TasklistIcon,
    SealCheckmarkFillIcon
} from "@navikt/aksel-icons";
import {Link} from '@remix-run/react';
import CircularProgressBar from "~/components/root/CircularProgressBar";

export function DashboardStats(stats: IStats, env: string) {
    return (
        <Box className={"h-full"}>
            <HStack className={"w-full border-b-2 mb-4 text-[#F76650]"} gap={"1"} align={"center"}>
                <SealCheckmarkFillIcon title="a11y-title" fontSize="1.5rem"/>
                <Heading size={"large"}>Miljø Oversikt - {env}</Heading>
            </HStack>
            <HGrid gap="6" columns={4} className={"h-full"}>
                <VStack gap={"4"} className={"h-full"}>
                    <Box padding={"4"} borderRadius='xlarge' background={"bg-subtle"} height={"!136px"}>
                        <Link to={"/kontrakter"}>
                            <Heading align="center" size="medium" spacing>
                                Kontrakter
                            </Heading>
                            <HStack align={"center"} justify={"space-around"} gap={"2"} padding={"2"}
                                    className={"w-full"}>
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
                        </Link>
                    </Box>
                    <Box padding={"10"} borderRadius='xlarge' className={"flex justify-center items-center"}
                         background={"bg-subtle"}>
                        <CircularProgressBar maxValue={stats.adapterContractAmount} value={stats.hasContectAmount}/>
                    </Box>
                </VStack>

                <VStack gap="4">
                    <Box padding={"4"} borderRadius='xlarge' height={"!136px"} background={"bg-subtle"}>
                        <Link to={"/hendelser"}>
                            <Heading align="center" size="medium" spacing>
                                Hendelser
                            </Heading>
                            <HStack padding={"2"} className={"w-full"}>
                                <ArrowRightLeftIcon title="Total requests" fontSize="1.5rem"
                                                    style={{marginLeft: "10%"}}/>
                                {stats.eventAmount}
                                <ArrowsSquarepathIcon title="Total responses" fontSize="1.5rem"
                                                      style={{marginLeft: "5%"}}/>
                                {stats.eventResponses}
                                <ExclamationmarkTriangleIcon title="Errors" fontSize="1.5rem"
                                                             style={{marginLeft: "5%"}}/>
                                {stats.eventErrors}
                            </HStack>
                        </Link>
                    </Box>
                    <Box padding={"10"} borderRadius='xlarge' className={"flex justify-center items-center"}
                         background={"bg-subtle"}>
                        <CircularProgressBar maxValue={stats.eventAmount} value={stats.eventResponses}/>
                    </Box>
                </VStack>
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