import {HStack, VStack} from "@navikt/ds-react";
import React from "react";
import KonsumerActionBar from "~/components/konsumere/KonsumerActionBar";
import KonsumerTab from "~/components/konsumere/KonsumerTab";

export default function Konsumere() {
  return (
    <VStack className="bg-gray-200" gap="4" padding="4">
      <KonsumerActionBar/>
      <HStack gap="2">
        <KonsumerTab/>
        <KonsumerTab/>
        <KonsumerTab/>
      </HStack>
    </VStack>
  );
}