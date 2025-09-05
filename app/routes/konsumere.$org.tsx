import { HStack, Page, Skeleton, VStack } from "@navikt/ds-react";
import { useState, useTransition } from "react";
import ConsumerActionbar from "~/components/konsumere/ConsumerActionbar";
import Title from "~/components/header/Title";
import { MockOrganisationTabs } from "~/mocks/mock_organisation_tabs";
import { useNavigate } from "react-router";
import { useLoaderData } from "@remix-run/react";
import ConsumerModal from "~/components/konsumere/konsumer_modal/ConsumerModal";
import { IConsumerRequest } from "~/types/consumer/IConsumerRequest";
import { IConsumerMetadata } from "~/types/consumer/IConsumerMetadata";
import { mockConsumerRequest } from "~/mocks/mock_consumer";
import { MockConsumerMetadata } from "~/mocks/mock_consumer_metadata";
import { ConsumerTab } from "~/components/konsumere/ConsumerTab";
import { ArrowLeftIcon } from "@navikt/aksel-icons";

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
    <Page.Block width={"md"}>
      <VStack gap="8">
        <Title
          title={`${routeData.org} Konsumere`}
          onIconClick={() => navigate("/konsumere")}
          icon={ArrowLeftIcon}
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
                key={`${consumer.domain} ${consumer.package}`}
                consumer={`${consumer.domain} ${consumer.package}`}
                // applications={4}
                // Why is this hardcoded?
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
          initialConsumer={mockConsumerRequest}
          openModal={openModal}
          setOpenModal={setOpenModal}
          consumerMetadata={routeData.consumerMetadata}
        />
      </VStack>
    </Page.Block>
  );
}
