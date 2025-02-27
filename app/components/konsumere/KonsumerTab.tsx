import {Box, HStack, VStack} from "@navikt/ds-react";
import {ArrowsCirclepathIcon, CaretRightCircleIcon, XMarkOctagonIcon} from "@navikt/aksel-icons";
import React from "react";

export default function KonsumerTab() {
  return (
    <Box
      borderRadius="large"
      shadow="large"
      width="200px"
      className="flex flex-col bg-[rgb(152,177,201)]"
    >
      <Box
        className="text-center bg-header text-body"
        padding="4"
        borderRadius="large"
        width="200px"
      >
        Oslo
      </Box>
      <Box
        className="bg-"
        borderRadius="0 0 large large"
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
    </Box>
  )
}