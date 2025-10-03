import { AdapterePage } from "~/components/AdapterePage";
import type { AdaptereData } from "~/types";
import {useLoaderData, type LoaderFunction} from "react-router";
import AdaptereApi from "~/routes/api/AdaptereApi";
import { parseEnvironmentFromCookieHeader } from "~/utils/cookies";
import { useEnvironmentRefresh } from "~/hooks/useEnvironmentRefresh";
import { Heading, BodyLong, Box } from "@navikt/ds-react";

export function meta() {
  return [
    { title: "Adaptere - Fint Core Status Service" },
    { name: "description", content: "View adapter status and configuration" },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    console.log('request', request);
    const cookieHeader = request.headers.get('Cookie');
    const env = parseEnvironmentFromCookieHeader(cookieHeader);
    console.log('env', env);

    const response = await AdaptereApi.getAllAdapters();
    // Extract the data from the ApiResponse wrapper
    const adapterData = response.data || [];
    return { adapterData, env };
  } catch (error) {
    console.error('Failed to load adapter data:', error);
    throw error;
  }
}

export default function Adaptere() {
  const { adapterData, env } = useLoaderData() as { adapterData: AdaptereData[], env: string };
  useEnvironmentRefresh(); // This will revalidate when environment changes
  console.log('env', env);
  if (!adapterData || adapterData.length === 0) {
    return (
      <Box padding="8" paddingBlock="2">
        <Box marginBlock="8">
          <Heading size="xlarge" spacing>
            Adaptere {env}
          </Heading>
          <BodyLong size="large" textColor="subtle">
            Loading adapter data...
          </BodyLong>
        </Box>
      </Box>
    );
  }

  return <AdapterePage initialData={adapterData} env={env} />;
}
