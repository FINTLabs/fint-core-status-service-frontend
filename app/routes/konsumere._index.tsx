import {HStack, VStack} from "@navikt/ds-react";
import React, {useState} from "react";
import KonsumerActionBar from "~/components/konsumere/KonsumerActionBar";
import KonsumerTab from "~/components/konsumere/KonsumerTab";
import Title from "~/components/header/Title";
import {konsumerTabs} from "~/mocks/konsumerTabs";

export default function Konsumere() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tabs] = useState(konsumerTabs)
  const filteredTabs = tabs.filter(tab =>
    tab.org.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <HStack justify="center">
      <VStack className="w-2/3" gap="8">
        <Title/>
        <KonsumerActionBar setQuery={setSearchQuery}/>
        <HStack gap="4">
          {filteredTabs.map((tab) => (
            <KonsumerTab
              key={tab.org}
              org={tab.org}
              applications={tab.applications}
              errors={tab.errors}
              restarts={tab.restarts}
            />
          ))}
        </HStack>
      </VStack>
    </HStack>
  );
}