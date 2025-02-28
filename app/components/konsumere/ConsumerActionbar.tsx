import {Button, HStack, Search} from "@navikt/ds-react";
import {ArrowsUpDownIcon, PlusIcon} from "@navikt/aksel-icons";
import React, {LegacyRef} from "react";

interface ConsumerActionbarProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>
  ref: LegacyRef<HTMLDialogElement>
}

export default function ConsumerActionbar({setQuery, ref}: ConsumerActionbarProps) {
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
          onClick={() => ref.current?.showModal()}
        >
          Ny Consumer
        </Button>
      </HStack>
    </HStack>
  )
}