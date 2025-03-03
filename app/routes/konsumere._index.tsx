import {HStack, VStack} from "@navikt/ds-react";
import React, {useRef, useState} from "react";
import ConsumerActionbar from "~/components/konsumere/ConsumerActionbar";
import ConsumerTab from "~/components/konsumere/ConsumerTab";
import Title from "~/components/header/Title";
import {MockConsumerTabs} from "~/mocks/mock_consumer_tabs";
import AdjustConsumerModal from "~/components/konsumere/add_konsumer/AdjustConsumerModal";
import {MockOrganisationTabs} from "~/mocks/mock_organisation_tabs";
import {MockConsumerMetadata} from "~/mocks/mock_consumer_metadata";
import {emptyConsumer} from "~/types/IConsumer";

export default function Konsumere() {
  const [openModal, setOpenModal] = useState(false)
  const [consumerTabs] = useState(MockOrganisationTabs)
  const [consumer, setConsumer] = useState(emptyConsumer)
  const [searchQuery, setSearchQuery] = useState("");
  const [consumerMetadata, setConsumerMetadata] = useState(MockConsumerMetadata)

  const filteredTabs = consumerTabs.filter(tab =>
    tab.org.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <HStack justify="center">
      <VStack className="w-2/3" gap="8">
        <Title/>
        <ConsumerActionbar
          setQuery={setSearchQuery}
          setOpenModal={setOpenModal}
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
          openModal={openModal}
          setOpenModal={setOpenModal}
          consumerMetadata={consumerMetadata}
          consumer={consumer}
          setConsumer={setConsumer}
          existingConsumer={false}
        />
      </VStack>
    </HStack>
  );
}