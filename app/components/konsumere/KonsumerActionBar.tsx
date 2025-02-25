import {Button, HStack, Search} from "@navikt/ds-react";
import {ArrowsUpDownIcon, PlusIcon} from "@navikt/aksel-icons";
import React from "react";

export default function KonsumerActionBar() {
    return (
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
    )
}