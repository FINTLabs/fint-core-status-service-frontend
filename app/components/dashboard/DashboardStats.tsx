import {
  Box,
  Detail,
  Heading,
  HGrid,
  HStack,
  InfoCard,
  VStack,
} from "@navikt/ds-react";
import {
  ArrowRightLeftIcon,
  ArrowsSquarepathIcon,
  ExclamationmarkTriangleIcon,
  HeartIcon,
  SealCheckmarkFillIcon,
  TasklistIcon,
} from "@navikt/aksel-icons";

import { NovariCircularProgressBar } from "novari-frontend-components";
import type { IStats } from "~/types";

interface DashboardStatsProps {
  stats: IStats;
  env: string;
}

export function DashboardStats({ stats, env }: DashboardStatsProps) {
  return (
    <InfoCard data-color="brand-magenta">
      <InfoCard.Header icon={<SealCheckmarkFillIcon />}>
        <InfoCard.Title>Miljø Oversikt - {env}</InfoCard.Title>
      </InfoCard.Header>
      <InfoCard.Content className={"full-width"}>
        <HGrid gap="space-24" columns={3}>
          <VStack gap={"space-16"}>
            <Box
              padding={"space-16"}
              borderRadius="12"
              background={"neutral-soft"}
            >
              <Heading align="center" size="medium" spacing>
                Adaptere
              </Heading>
              <HStack gap={"space-8"} justify={"center"}>
                <HeartIcon title="Healty heartbeats" fontSize="1.5rem" />
                {stats.hasContectAmount}
                <TasklistIcon title="Total Contracts" fontSize="1.5rem" />
                {stats.adapterContractAmount} total
              </HStack>
            </Box>
            <Box
              padding={"space-40"}
              borderRadius="12"
              className={"flex justify-center items-center"}
              background={"neutral-soft"}
            >
              <NovariCircularProgressBar
                maxValue={stats.adapterContractAmount}
                value={stats.hasContectAmount}
              />
            </Box>
          </VStack>

          <VStack gap="space-16">
            <Box
              padding={"space-16"}
              borderRadius="12"
              background={"neutral-soft"}
            >
              <Heading align="center" size="medium" spacing>
                Hendelser
              </Heading>
              <HStack gap={"space-8"} justify={"center"}>
                <ArrowRightLeftIcon title="Total requests" fontSize="1.5rem" />
                {stats.eventAmount}
                <ArrowsSquarepathIcon
                  title="Total responses"
                  fontSize="1.5rem"
                />
                {stats.eventResponses}
                <ExclamationmarkTriangleIcon title="Errors" fontSize="1.5rem" />
                {stats.eventErrors}
              </HStack>
            </Box>
            <Box
              padding={"space-40"}
              borderRadius="12"
              className={"flex justify-center items-center"}
              background={"neutral-soft"}
            >
              <NovariCircularProgressBar
                maxValue={stats.eventAmount}
                value={stats.eventResponses}
              />
            </Box>
          </VStack>

          <Box
            padding={"space-16"}
            borderRadius="12"
            background={"neutral-soft"}
          >
            <Heading align="center" size="medium">
              Synkroniseringer
            </Heading>
            <Detail className={"w-fit"}>Will be added later</Detail>
          </Box>
        </HGrid>
      </InfoCard.Content>
    </InfoCard>
  );
}
