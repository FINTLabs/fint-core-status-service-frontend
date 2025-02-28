import {Box, HStack, VStack} from "@navikt/ds-react";
import {ArrowsCirclepathIcon, CaretRightCircleIcon, XMarkOctagonIcon} from "@navikt/aksel-icons";
import React from "react";
import {IConsumerTab} from "~/types/IConsumerTab";

interface onClickProp {
  onClick?: () => void;
}

export default function ConsumerTab({org, applications, errors, restarts, onClick}: IConsumerTab & onClickProp) {
  return (
    <Box
      borderRadius="large"
      shadow="large"
      width="200px"
      className="flex flex-col bg-[rgb(152,177,201)]"
      onClick={onClick}
    >
      <Box
        className="text-center bg-header text-body"
        padding="4"
        borderRadius="large"
        width="200px"
      >
        {org}
      </Box>
      <Box
        className="bg-"
        borderRadius="0 0 large large"
        padding="1"
      >
        <VStack gap="1">
          <HStack gap="2" align="center">
            <CaretRightCircleIcon aria-hidden/>
            {applications}
          </HStack>
          <HStack gap="2" align="center">
            <XMarkOctagonIcon aria-hidden/>
            {errors}
          </HStack>
          <HStack gap="2" align="center">
            <ArrowsCirclepathIcon aria-hidden/>
            {restarts}
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}