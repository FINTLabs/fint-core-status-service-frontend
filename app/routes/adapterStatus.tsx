import { AdapterPage } from "~/components/adapters/AdapterPage";
import type { IAdaptereData } from "~/types";
import { useLoaderData, type LoaderFunction } from "react-router";
import AdaptereApi from "~/api/AdapterApi";
import { Heading, BodyLong, Box } from "@navikt/ds-react";
import { NovariSnackbar, type NovariSnackbarItem } from "novari-frontend-components";
import { useEffect, useState } from "react";
import { selectedEnvCookie } from "~/utils/cookies";

export function meta() {
  return [
    { title: "AdapterStatus - Fint Core Status Service" },
    { name: "description", content: "View adapter status and configuration" },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const env = cookieHeader ? selectedEnvCookie.parse(cookieHeader) : "api";

  const response = await AdaptereApi.getAllAdapters();
  const adapterData = response.data || [];
  return {
    adapterData,
    env,
    success: response.success,
    customErrorMessage: response.message || "Kunne ikke hente adaptere",
  };
};

export default function AdapterStatus() {
  const { adapterData, env, success, customErrorMessage } = useLoaderData() as {
    adapterData: IAdaptereData[];
    env: string;
    success: boolean;
    customErrorMessage: string;
  };

  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  useEffect(() => {
    if (!success) {
      setAlerts([
        {
          id: `adapterStatus-error-${Date.now()}`,
          variant: "error",
          message: customErrorMessage,
          header: "Connection Feil",
        },
      ]);
    }
  }, [customErrorMessage, success]);

  if (!adapterData || adapterData.length === 0) {
    return (
      <>
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
        <NovariSnackbar items={alerts} />
      </>
    );
  }

  return (
    <>
      <AdapterPage initialData={adapterData} env={env} />
      <NovariSnackbar items={alerts} />
    </>
  );
}
