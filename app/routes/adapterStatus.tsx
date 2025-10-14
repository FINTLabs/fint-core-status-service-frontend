import { AdapterePage } from "~/components/adapters/AdapterePage";
import type { IAdaptereData } from "~/types";
import { useLoaderData, type LoaderFunction } from "react-router";
import AdaptereApi from "~/routes/api/AdapterApi";
import { parseEnvironmentFromCookieHeader } from "~/utils/cookies";
import { useEnvironmentRefresh } from "~/hooks/useEnvironmentRefresh";
import { Heading, BodyLong, Box } from "@navikt/ds-react";

export function meta() {
  return [
    { title: "AdapterStatus - Fint Core Status Service" },
    { name: "description", content: "View adapter status and configuration" },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const env = parseEnvironmentFromCookieHeader(cookieHeader);

  const response = await AdaptereApi.getAllAdapters();
  const adapterData = response.data || [];
  return { adapterData, env };
};

export default function AdapterStatus() {
  const { adapterData, env } = useLoaderData() as {
    adapterData: IAdaptereData[];
    env: string;
  };

  useEnvironmentRefresh();
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
