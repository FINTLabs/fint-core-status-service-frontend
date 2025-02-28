import {Button, HStack, Search} from "@navikt/ds-react";
import {ArrowsUpDownIcon, PlusIcon} from "@navikt/aksel-icons";
import React, {LegacyRef, MutableRefObject} from "react";

interface ConsumerActionbarProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ConsumerActionbar({setQuery, setOpenModal}: ConsumerActionbarProps) {
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
        <Button iconPosition="right" icon={<ArrowsUpDownIcon aria-hidden/>}>
          Oppdater Versjon
        </Button>
        <Button
          iconPosition="right"
          icon={<PlusIcon aria-hidden/>}
          onClick={() => setOpenModal(true)}
        >
          Ny Consumer
        </Button>
      </HStack>
    </HStack>
  )
}