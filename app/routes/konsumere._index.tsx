import { HStack, Page, VStack } from "@navikt/ds-react";
import React, { useState } from "react";
import ConsumerActionbar from "~/components/konsumere/ConsumerActionbar";
import Title from "~/components/header/Title";
import { MockOrganisationTabs } from "~/mocks/mock_organisation_tabs";
import ConsumerModal from "~/components/konsumere/konsumer_modal/ConsumerModal";
import { MockConsumerMetadata } from "~/mocks/mock_consumer_metadata";
import { useNavigate } from "react-router";
import { ChangingRoomIcon } from "@navikt/aksel-icons";
import { OrganizationTab } from "~/components/konsumere/OrganizationTab";

export default function Konsumere() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [query, setQuery] = useState("");
  const [organisationTabs] = useState(MockOrganisationTabs);
  const [consumerMetadata] = useState(MockConsumerMetadata);

  const filteredOrganisationTabs = organisationTabs.filter((tab) =>
    tab.org.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Page.Block width={"md"}>
      <VStack gap="8">
        <Title title="konsumere" icon={ChangingRoomIcon} />
        <ConsumerActionbar setQuery={setQuery} openModalSetter={setOpenModal} />
        <HStack className={"flex flex-row gap-6"}>
          {filteredOrganisationTabs.map((tab) => (
            <OrganizationTab
              onClick={() => navigate(`/konsumere/${tab.org}`)}
              key={tab.org}
              org={tab.org}
              applications={tab.applications}
              errors={tab.errors}
              restarts={tab.restarts}
            />
          ))}
        </HStack>

        <ConsumerModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          consumerMetadata={consumerMetadata}
        />
      </VStack>
    </Page.Block>
  );
}
