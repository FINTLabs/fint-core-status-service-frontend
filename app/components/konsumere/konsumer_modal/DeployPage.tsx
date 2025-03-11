import {Box, Button, Heading, HStack, Loader, VStack} from "@navikt/ds-react";
import {IConsumer} from "~/types/consumer/IConsumer";

interface DeployPageProps {
  consumer: IConsumer
  editing: boolean
}

export default function DeployPage({consumer, editing}: DeployPageProps) {
  return (
    <VStack gap="2">
      <HStack>
        <Button>
          Deploy
        </Button>
      </HStack>
      <Box
        className="w-full flex justify-between p-2 h-12"
        shadow="medium"
        borderRadius="large"
      >
        <VStack justify="center">
          <HStack gap="4">
            <Loader size="medium" title="Venter..."/>
            <Heading size="small">
              Utdanning utdanningsprogram - fintlabs.no
            </Heading>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  )
}