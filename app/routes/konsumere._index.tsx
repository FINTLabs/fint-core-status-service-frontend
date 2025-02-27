import {HStack, VStack} from "@navikt/ds-react";
import React from "react";
import KonsumerActionBar from "~/components/konsumere/KonsumerActionBar";
import KonsumerTab from "~/components/konsumere/KonsumerTab";
import Title from "~/components/header/Title";
import {konsumerTabs} from "~/mocks/konsumerTabs";

export default function Konsumere() {
  return (
    <HStack justify="center">
      <VStack className="w-2/3" gap="8">
        <Title/>
        <KonsumerActionBar/>
        <HStack gap="4">
          {konsumerTabs.map((tab) => (
            <KonsumerTab org={tab.org} applications={tab.applications} errors={tab.errors} restarts={tab.errors} />
          ))}
        </HStack>
      </VStack>
    </HStack>
  );
}