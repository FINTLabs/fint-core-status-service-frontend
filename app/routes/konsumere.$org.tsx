import { HStack, Skeleton, VStack } from "@navikt/ds-react";
import React, { useState, useTransition } from "react";
import ConsumerActionbar from "~/components/konsumere/ConsumerActionbar";
import Title from "~/components/header/Title";
import { MockOrganisationTabs } from "~/mocks/mock_organisation_tabs";
import { ArrowLeftIcon } from "@navikt/aksel-icons";
import { useNavigate } from "react-router";
import { useLoaderData } from "@remix-run/react";
import ConsumerModal from "~/components/konsumere/konsumer_modal/ConsumerModal";
import { IConsumerRequest } from "~/types/consumer/IConsumerRequest";
import { IConsumerMetadata } from "~/types/consumer/IConsumerMetadata";
import { mockConsumerRequest } from "~/mocks/mock_consumer";
import { MockConsumerMetadata } from "~/mocks/mock_consumer_metadata";
import { ConsumerTab } from "~/components/konsumere/ConsumerTab";

interface OrgRouteData {
  org: string;
  consumerMetadata: IConsumerMetadata;
  consumers: IConsumerRequest[];
}

export const loader = async ({
  params,
}: {
  params: { org?: string };
}): Promise<OrgRouteData> => {
  const organization = params.org || "defaultOrg";
  return {
    org: organization,
    consumers: [mockConsumerRequest],
    consumerMetadata: MockConsumerMetadata,
  };
};

//TODO: What is this file - where is it used
export default function Konsumere() {
  const navigate = useNavigate();
  const routeData = useLoaderData<OrgRouteData>();
  // const [consumer, setConsumer] = useState();
  const [inTransition, transition] = useTransition();
  const [consumerTabs] = useState(MockOrganisationTabs);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConsumers = routeData.consumers.filter((tab) =>
    `${tab.domain} ${tab.package}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <HStack justify="center">
      <VStack className="w-2/3" gap="8">
        <Title
          title={`${routeData.org} Konsumere`}
          onIconClick={() => navigate("/konsumere")}
          icon={<ArrowLeftIcon style={{ width: "48px", height: "48px" }} />}
        />
        <ConsumerActionbar
          setQuery={setSearchQuery}
          openModalSetter={setOpenModal}
        />

        <HStack gap="4">
          {inTransition ? (
            <Skeleton width="200px" />
          ) : (
            filteredConsumers.map((consumer) => (
              <ConsumerTab
                className="cursor-pointer"
                key={`${consumer.domain} ${consumer.package}`}
                consumer={`${consumer.domain} ${consumer.package}`}
                applications={4}
                errors={3}
                restarts={2}
                onClick={() => {
                  setOpenModal(true);
                }}
              />
            ))
          )}
        </HStack>
        <ConsumerModal
          initialConsumer={consumer}
          openModal={openModal}
          setOpenModal={setOpenModal}
          consumerMetadata={routeData.consumerMetadata}
        />
      </VStack>
    </HStack>
  );
}
