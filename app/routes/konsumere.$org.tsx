import {HStack, Skeleton, VStack} from "@navikt/ds-react";
import React, {useState, useTransition} from "react";
import ConsumerActionbar from "~/components/konsumere/ConsumerActionbar";
import Title from "~/components/header/Title";
import {MockOrganisationTabs} from "~/mocks/mock_organisation_tabs";
import {ArrowLeftIcon} from "@navikt/aksel-icons";
import {useNavigate} from "react-router";
import {useLoaderData} from "@remix-run/react";
import {OrganizationTab} from "~/components/konsumere/OrganizationTab";
import ConsumerModal from "~/components/konsumere/konsumer_modal/ConsumerModal";
import {IConsumerRequest} from "~/types/consumer/IConsumerRequest";
import {IConsumerMetadata} from "~/types/consumer/IConsumerMetadata";
import {mockConsumerRequest} from "~/mocks/mock_consumer";
import {MockConsumerMetadata} from "~/mocks/mock_consumer_metadata";
import {newConsumer} from "~/types/consumer/IConsumer";

interface OrgRouteData {
  org: string;
  consumerMetadata: IConsumerMetadata;
  consumers: IConsumerRequest[];
}

export const loader = async ({params}: { params: { org?: string } }): Promise<OrgRouteData> => {
  const organization = params.org || "defaultOrg";
  await new Promise(resolve => setTimeout(resolve, 3000));
  return {
    org: organization,
    consumers: [mockConsumerRequest],
    consumerMetadata: MockConsumerMetadata
  };
};

export default function Konsumere() {
  const navigate = useNavigate()
  const routeData = useLoaderData<OrgRouteData>()
  const [consumer, setConsumer] = useState()
  const [inTransition, transition] = useTransition();
  const {organization} = useLoaderData<{ organization: string }>();
  const [consumerTabs] = useState(MockOrganisationTabs)
  const [openModal, setOpenModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <HStack justify="center">
      <VStack className="w-2/3" gap="8">
        <Title
          title={`${organization} Konsumere`}
          onIconClick={() => navigate("/konsumere")}
          icon={<ArrowLeftIcon style={{width: '48px', height: '48px'}}/>}
        />
        <ConsumerActionbar
          setQuery={setSearchQuery}
          openModalSetter={setOpenModal}
        />

        <HStack gap="4">
          {inTransition ? (
            <Skeleton width="200px"/>
          ) : (
            <OrganizationTab
              className="cursor-pointer"
              key="asd"
              org="tab.org"
              applications={4}
              errors={3}
              restarts={2}
              onClick={() => {
                setOpenModal(true)
              }}
            />
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