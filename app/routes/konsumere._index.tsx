import {VStack} from "@navikt/ds-react";
import React from "react";
import KonsumerActionBar from "~/components/konsumere/KonsumerActionBar";

export default function Konsumere() {
  return (
    <VStack className="bg-gray-200" gap="4">
      <KonsumerActionBar/>
    </VStack>
  );
}