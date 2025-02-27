import {HStack, VStack} from "@navikt/ds-react";

export default function HeaderElement({ children }) {
    return (
      <VStack justify="center">
          <HStack justify="center">
              {children}
          </HStack>
      </VStack>
    )
}