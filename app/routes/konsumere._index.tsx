import {HStack, VStack} from "@navikt/ds-react";
import React, {useState} from "react";
import ConsumerActionbar from "~/components/konsumere/ConsumerActionbar";
import OrganisationTab from "~/components/konsumere/OrganisationTab";
import Title from "~/components/header/Title";
import {MockOrganisationTabs} from "~/mocks/mock_organisation_tabs";
import ConsumerModal from "~/components/konsumere/konsumer_modal/ConsumerModal";
import {MockConsumerMetadata} from "~/mocks/mock_consumer_metadata";
import {useNavigate} from "react-router";
import {ChangingRoomIcon} from "@navikt/aksel-icons";

export default function Konsumere() {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [query, setQuery] = useState("")
  const [organisationTabs] = useState(MockOrganisationTabs)
  const [consumerMetadata] = useState(MockConsumerMetadata)

  const filteredOrganisationTabs = organisationTabs.filter(tab =>
    tab.org.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <HStack justify="center">
      <VStack className="w-2/3" gap="8">
        <Title
          icon={<ChangingRoomIcon style={{width: '48px', height: '48px'}}/>}
        />
        <ConsumerActionbar
          setQuery={setQuery}
          openModalSetter={setOpenModal}
        />
        <HStack gap="4">
          {filteredOrganisationTabs.map((tab) => (
            <OrganisationTab
              onClick={() => navigate(`/konsumere/${tab.org}`)}
              className="cursor-pointer"
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
    </HStack>
  );
}