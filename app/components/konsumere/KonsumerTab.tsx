import {Box, HStack, VStack} from "@navikt/ds-react";
import {ArrowsCirclepathIcon, CaretRightCircleIcon, XMarkOctagonIcon} from "@navikt/aksel-icons";
import React from "react";

export default function KonsumerTab() {
  return (
    <VStack>
      <Box
        className="text-center bg-[rgb(31,61,89)] text-white"
        padding="4"
        borderRadius="large large 0 0"
        shadow="large"
        width="200px"
      >
        Oslo
      </Box>
      <Box
        className="bg-[rgb(152,177,201)]"
        borderRadius="0 0 large large"
        shadow="large"
        padding="1"
      >
        <VStack gap="1">
          <HStack gap="2" align="center">
            <CaretRightCircleIcon aria-hidden/>
            123
          </HStack>
          <HStack gap="2" align="center">
            <XMarkOctagonIcon aria-hidden/>
            123
          </HStack>
          <HStack gap="2" align="center">
            <ArrowsCirclepathIcon aria-hidden/>
            123
          </HStack>
        </VStack>
      </Box>
    </VStack>
  )
}