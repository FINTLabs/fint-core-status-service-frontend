import {Box, Heading, VStack} from "@navikt/ds-react";
import {Consumer} from "~/components/komponenter/Consumer";

export default function ConsumerMetric({consumer}: { consumer: Consumer }) {
    return (
      <Box borderRadius="large" shadow="xsmall" padding="2">
        <VStack>
          <Heading size="small">{consumer.org}</Heading>
          <Heading size="small">{consumer.domain} {consumer.package}</Heading>
          <Heading size="small">Cache State: {consumer.cacheSize}/{consumer.targetCacheSize}</Heading>
        </VStack>
      </Box>
    )
}