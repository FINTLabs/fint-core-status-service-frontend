import {Box, Button, Heading, HStack, Loader, VStack} from "@navikt/ds-react";
import {IConsumer} from "~/types/consumer/IConsumer";
import {useState} from "react";
import {ConsumerApi} from "~/api/ConsumerApi";

interface DeployPageProps {
  consumer: IConsumer
}

export default function DeployPage({consumer}: DeployPageProps) {
  const [log, setLog] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);

  const deployChunk = async (org: string, component: string) => {
    const promise = ConsumerApi.deployConsumer(consumer, );
  };

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