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
    // Create the request payload.
    // Adjust the object to match your IConsumerRequest type.
    const requestPayload: IConsumerRequest = {
      ...consumer,
      organisation: org,
      component, // shorthand for component: component
    };

    try {
      const response = await ConsumerApi.deploy(requestPayload);

      if (!response.body) {
        console.error("ReadableStream not supported in this browser.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      // Read chunks and update the log state with context.
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setLog(prev =>
            prev +
            `\n=== [Org: ${org} | Component: ${component}] ===\n` +
            chunk +
            "\n"
          );
        }
      }
    } catch (error) {
      console.error(`Deployment failed for Org: ${org}, Component: ${component}`, error);
      setLog(prev =>
        prev +
        `\n=== [Org: ${org} | Component: ${component}] ===\nError: ${error}\n`
      );
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    setLog("");

    const tasks: Promise<void>[] = [];
    for (const org of consumer.organisations) {
      for (const component of Object.keys(consumer.components)) {
        tasks.push(deployChunk(org, component));
      }
    }

    try {
      await Promise.all(tasks);
    } catch (error) {
      console.error("Some deployments failed", error);
    } finally {
      setIsDeploying(false);
    }
  };

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const {value, done: doneReading} = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, {stream: true});
          setLog(prev => prev + chunk);
        }
      }
    } catch (error) {
      console.error("Deployment failed", error);
    } finally {
      setIsDeploying(false);
    }
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