import {Box, Heading, HStack} from "@navikt/ds-react";
import ConsumerMetric from "~/components/komponenter/ConsumerMetric";
import {IConsumer} from "~/components/komponenter/IConsumer";

export default function AllConsumers({consumers}: { consumers: IConsumer[] }) {
  const consumersByDomain = consumers.reduce((acc: { [domain: string]: IConsumer[] }, consumer) => {
    if (!acc[consumer.domain]) {
      acc[consumer.domain] = [];
    }
    acc[consumer.domain].push(consumer);
    return acc;
  }, {});

  return (
    <>
      {Object.keys(consumersByDomain).map((domain, i) => (
        <Box key={domain} borderRadius="large" shadow="xsmall" padding="4">
          <HStack justify="center">
            <Heading size="medium">{domain}</Heading>
          </HStack>
          <HStack>
            {consumersByDomain[domain].map((consumer) => (
              <ConsumerMetric key={i} consumer={consumer} />
            ))}
          </HStack>
        </Box>
      ))}
    </>
  );
}