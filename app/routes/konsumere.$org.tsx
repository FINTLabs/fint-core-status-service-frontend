import {HStack, VStack} from "@navikt/ds-react";
import React, {useState} from "react";
import ConsumerActionbar from "~/components/konsumere/ConsumerActionbar";
import Title from "~/components/header/Title";
import {MockOrganisationTabs} from "~/mocks/mock_organisation_tabs";

export default function Konsumere() {
  const [consumerTabs] = useState(MockOrganisationTabs)
  const [openModal, setOpenModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <HStack justify="center">
      <VStack className="w-2/3" gap="8">
        <Title/>
        <ConsumerActionbar
          setQuery={setSearchQuery}
          openModalSetter={setOpenModal}
        />

      </VStack>
    </HStack>
  );
}