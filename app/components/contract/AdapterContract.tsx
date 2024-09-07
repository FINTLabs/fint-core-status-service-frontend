import {Box, HStack, Spacer, VStack} from "@navikt/ds-react";
import {
  ArchiveIcon, Buildings2Icon,
  CogRotationIcon,
  HatSchoolIcon,
  HeartIcon,
  PersonGroupIcon, PersonSuitIcon,
  PiggybankIcon
} from "@navikt/aksel-icons";

export default function AdapterContract({adapterContract}) {
  return (
    <Box borderRadius="large" background="surface-subtle" padding="4" shadow="xsmall">
      <VStack gap="1">
        <HStack align="center" gap="4">
          <VStack>
            <p>adapter-id</p>
            <p>username</p>
          </VStack>
          <Spacer/>
          <HeartIcon/>
        </HStack>
        <HStack gap="2">
          <p className="text-sm">Full Sync: 21:49 | 07.21</p>
          <Spacer/>
          <HatSchoolIcon/>
          <ArchiveIcon />
          <PiggybankIcon />
          <PersonGroupIcon />
          <CogRotationIcon />
          <Buildings2Icon />
        </HStack>
      </VStack>
    </Box>
  )
}