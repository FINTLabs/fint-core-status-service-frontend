import { Box, Detail, Heading, HGrid, HStack, VStack } from "@navikt/ds-react";
import { ArrowRightLeftIcon, ArrowsSquarepathIcon, ExclamationmarkTriangleIcon, HeartIcon, SealCheckmarkFillIcon, TasklistIcon } from "@navikt/aksel-icons";

import { NovariCircularProgressBar } from "novari-frontend-components";
import type { IStats } from "~/types";

interface DashboardStatsProps {
  stats: IStats;
  env: string;
}

export function DashboardStats({ stats, env }: DashboardStatsProps) {
  return (
    <Box className={"h-full pb-8"}>
      <HStack className={"w-full border-b-2 mb-4 text-[#F76650]"} gap={"1"} align={"center"}>
        <SealCheckmarkFillIcon title="a11y-title" fontSize="1.5rem" />
        <Heading size={"large"}>Miljø Oversikt - {env}</Heading>
      </HStack>
      <HGrid gap="6" columns={4} className={"h-full"}>
        <VStack gap={"4"} className={"h-full"}>
          <Box padding={"4"} borderRadius="xlarge" background={"bg-subtle"}>
            <Heading align="center" size="medium" spacing>
              Adaptere
            </Heading>
            <HStack gap={"2"} justify={"center"}>
              <HeartIcon title="Healty heartbeats" fontSize="1.5rem" />
              {stats.hasContectAmount}
              <TasklistIcon title="Total Contracts" fontSize="1.5rem" />
              {stats.adapterContractAmount} total
            </HStack>
          </Box>
          <Box padding={"10"} borderRadius="xlarge" className={"flex justify-center items-center"} background={"bg-subtle"}>
            <NovariCircularProgressBar maxValue={stats.adapterContractAmount} value={stats.hasContectAmount} />
          </Box>
        </VStack>

        <VStack gap="4">
          <Box padding={"4"} borderRadius="xlarge" background={"bg-subtle"}>
            <Heading align="center" size="medium" spacing>
              Hendelser
            </Heading>
            <HStack gap={"2"} justify={"center"}>
              <ArrowRightLeftIcon title="Total requests" fontSize="1.5rem" />
              {stats.eventAmount}
              <ArrowsSquarepathIcon title="Total responses" fontSize="1.5rem" />
              {stats.eventResponses}
              <ExclamationmarkTriangleIcon title="Errors" fontSize="1.5rem" />
              {stats.eventErrors}
            </HStack>
          </Box>
          <Box padding={"10"} borderRadius="xlarge" className={"flex justify-center items-center"} background={"bg-subtle"}>
            <NovariCircularProgressBar maxValue={stats.eventAmount} value={stats.eventResponses} />
          </Box>
        </VStack>

        <Box padding={"4"} borderRadius="xlarge" background={"bg-subtle"}>
          <Heading align="center" size="medium">
            Synkroniseringer
          </Heading>
          <Detail className={"w-fit"}>Will be added later</Detail>
        </Box>
      </HGrid>
    </Box>
  );
}
