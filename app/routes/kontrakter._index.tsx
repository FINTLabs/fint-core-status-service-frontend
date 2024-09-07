import {BodyShort, Box, Detail, Heading, Hide, HStack, Show, VStack} from "@navikt/ds-react";
import AdapterContract from "~/components/contract/AdapterContract";

export default function Kontrakter() {
    return (
      <HStack justify="center">
          <VStack gap="4">
            <Box
              as="header"
              borderWidth="0 0 4 0"
              borderColor="black"
              paddingBlock="12 0"
            >
              <div className="max-w-5xl">
                <Box background="surface-default" paddingInline="4" paddingBlock="0 6">
                  <HStack align="start" gap="8">
                    <VStack gap={{ xs: "4", md: "5" }}>
                      <Heading level="1" size="xlarge">
                        Adapter Kontrakter
                      </Heading>
                    </VStack>
                  </HStack>
                </Box>
              </div>
            </Box>
              <AdapterContract/>
          </VStack>
      </HStack>
    )
}