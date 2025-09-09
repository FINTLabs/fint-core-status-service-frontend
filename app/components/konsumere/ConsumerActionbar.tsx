import { Button, HStack, Search } from "@navikt/ds-react";
import { ArrowsUpDownIcon, PlusIcon } from "@navikt/aksel-icons";
import React from "react";

interface ConsumerActionbarProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  openModalSetter: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConsumerActionbar({
  setQuery,
  openModalSetter,
}: ConsumerActionbarProps) {
  return (
    <HStack justify="space-between">
      <HStack gap="2">
        <Search
          onChange={(org) => setQuery(org)}
          label="Søk igjennom konsumere"
          variant="primary"
        />
      </HStack>
      <HStack gap="2">
        <Button
          iconPosition="right"
          icon={<ArrowsUpDownIcon aria-hidden />}
          variant={"primary"}
        >
          Oppdater Versjon
        </Button>
        <Button
          iconPosition="right"
          icon={<PlusIcon aria-hidden />}
          onClick={() => openModalSetter(true)}
        >
          Ny Konsumer
        </Button>
      </HStack>
    </HStack>
  );
}
