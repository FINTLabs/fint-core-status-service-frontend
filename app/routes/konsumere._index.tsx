import {ActionMenu, Button, HStack, Search, VStack} from "@navikt/ds-react";
import {ArrowsUpDownIcon, ChevronDownIcon, PencilIcon, PlusIcon} from "@navikt/aksel-icons";
import React from "react";

export default function Konsumere() {
  const [views, setViews] = React.useState({
    started: true,
    fnr: false,
    tags: true,
  });

  const [rows, setRows] = React.useState<string>("5");

  const handleCheckboxChange = (checkboxId: string) => {
    setViews((prevState) => ({
      ...prevState,
      [checkboxId]: !prevState[checkboxId],
    }));
  };

  return (
    <VStack className="bg-gray-200">
      <HStack justify="space-between">
        <HStack gap="2">
          <form role="search">
            <Search label="Søk alle Nav sine sider" variant="primary"/>
          </form>
        </HStack>
        <HStack gap="2">
          <Button iconPosition="right" icon={<ArrowsUpDownIcon aria-hidden/>}>
          Oppdater Versjon
          </Button>
          <Button iconPosition="right" icon={<PlusIcon aria-hidden/>}>
            Ny Consumer
          </Button>
        </HStack>
      </HStack>
    </VStack>
  );
}