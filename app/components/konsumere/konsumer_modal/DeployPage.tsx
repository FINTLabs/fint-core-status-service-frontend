import {Box, Button, Heading, HStack, Loader, VStack} from "@navikt/ds-react";
import {IConsumer} from "~/types/consumer/IConsumer";
import {useState} from "react";
import {useFetcher} from "@remix-run/react";
import {DeployResponse} from "~/routes/konsumere.deploy";

interface DeployPageProps {
  consumer: IConsumer
}

export default function DeployPage({consumer}: DeployPageProps) {
  const fetcher = useFetcher<DeployResponse>()
  const [log, setLog] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = () => {
    const formData = new FormData();
    formData.append("consumer", JSON.stringify(consumer));
    fetcher.submit(formData, {
      method: "post",
      action: "/konsumere/deploy",
    });
  };

  return (
    <VStack gap="2">
      <HStack>
        <Button onClick={handleDeploy}>
          Deploy
        </Button>
      </HStack>
      {fetcher.data &&
        fetcher.data.responses.map((res, index) => (
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
        ))}
    </VStack>
  )
}