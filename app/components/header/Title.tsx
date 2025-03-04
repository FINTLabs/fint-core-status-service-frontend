import {Box, Heading, HStack, VStack,} from "@navikt/ds-react";
import {ChangingRoomIcon} from "@navikt/aksel-icons";


export default function Title() {
  return (
    <Box
      as="header"
      borderWidth="0 0 4 0"
      borderColor="border-success"
      paddingBlock="4 0"
    >
      <div className="max-w-5xl">
        <Box paddingInline="4" paddingBlock="0 6">
          <HStack align="start" gap="8">
            <ChangingRoomIcon style={{width: '48px', height: '48px'}}/>

            <VStack gap={{xs: "4", md: "5"}}>
              <Heading level="1" size="xlarge">
                Konsumere
              </Heading>

            </VStack>
          </HStack>
        </Box>
      </div>
    </Box>
  );
};
