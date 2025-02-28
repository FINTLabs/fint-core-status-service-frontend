import {HStack, VStack} from "@navikt/ds-react";
import React, {useState} from "react";
import KonsumerActionBar from "~/components/konsumere/KonsumerActionBar";
import ConsumerTab from "~/components/konsumere/ConsumerTab";
import Title from "~/components/header/Title";
import {MockConsumerTabs} from "~/mocks/mock_consumer_tabs";
import AdjustConsumerModal from "~/components/konsumere/add_konsumer/AdjustConsumerModal";
import {IConsumer} from "~/types/IConsumer";
import {IConsumerMetadata} from "~/types/IConsumerMetadata";
import {MockConsumerMetadata} from "~/mocks/mock_consumer_metadata";

export default function Konsumere() {
  const [tabs] = useState(MockConsumerTabs)
  const [searchQuery, setSearchQuery] = useState("");
  const [openConsumerEditModal, setOpenConsumerEditModal] = useState(false)
  const [consumer, setConsumer]: IConsumer = useState(null)

  const filteredTabs = tabs.filter(tab =>
    tab.org.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <HStack justify="center">
      <VStack className="w-2/3" gap="8">
        <Title/>
        <KonsumerActionBar
          setQuery={setSearchQuery}
          setOpenAddConsumer={setOpenConsumerEditModal}
        />
        <HStack gap="4">
          {filteredTabs.map((tab) => (
            <ConsumerTab
              key={tab.org}
              org={tab.org}
              applications={tab.applications}
              errors={tab.errors}
              restarts={tab.restarts}
            />
          ))}
        </HStack>

        <AdjustConsumerModal
          open={openConsumerEditModal}
          setOpen={setOpenConsumerEditModal}
          consumer={consumer}
          setConsumer={setConsumer}
          consumerMetadata={consumerMetadata}
        />
      </VStack>
    </HStack>
  );
}