import {HStack, VStack} from "@navikt/ds-react";
import React, {useState} from "react";
import ConsumerActionbar from "~/components/konsumere/ConsumerActionbar";
import Title from "~/components/header/Title";
import {MockOrganisationTabs} from "~/mocks/mock_organisation_tabs";
import {ArrowLeftIcon} from "@navikt/aksel-icons";
import {useNavigate} from "react-router";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";

export const loader = async ({ params }: { params: { org?: string } }) => {
  const organization = params.org || "defaultOrg";
  return json({ organization });
};

export default function Konsumere() {
  const navigate = useNavigate()
  const { organization } = useLoaderData<{ organization: string }>();
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
        <div>
          <h1>Organization: </h1>
        </div>
      </VStack>
    </HStack>
  );
}