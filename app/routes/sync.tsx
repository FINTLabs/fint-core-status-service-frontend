import { type LoaderFunction, useLoaderData } from "react-router";
import type { Route } from "./+types/sync";
import SyncApi from "~/api/SyncApi";
import { SyncPage } from "~/components/sync/SyncPage";
import type { ISyncData } from "~/types";
import { useEnvironmentRefresh } from "~/hooks/useEnvironmentRefresh";
import { parseEnvironmentFromCookieHeader } from "~/utils/cookies";
import { NovariSnackbar, type NovariSnackbarItem } from "novari-frontend-components";
import { useEffect, useState } from "react";
import { BodyLong, Box, Heading } from "@navikt/ds-react";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Synkronisering - Fint Core Status Service" },
    { name: "description", content: "Oversikt over synkroniseringer i Fint Core" },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const env = parseEnvironmentFromCookieHeader(cookieHeader);
  const response = await SyncApi.getAllSync();
  return {
    syncData: response.data || [],
    env,
    success: response.success,
    customErrorMessage: response.message || "Kunne ikke hente synkroniseringer",
  };
};

export default function Sync() {
  const { syncData, env, success, customErrorMessage } = useLoaderData() as {
    syncData: ISyncData[];
    env: string;
    success: boolean;
    customErrorMessage: string;
  };

  useEnvironmentRefresh();
  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  useEffect(() => {
    if (!success) {
      setAlerts([
        {
          id: `sync-error-${Date.now()}`,
          variant: "error",
          message: customErrorMessage,
          header: "Connection Feil",
        },
      ]);
    }
  }, [customErrorMessage, success]);

  if (!syncData || syncData.length === 0) {
    return (
      <>
        <Box padding="8" paddingBlock="2">
          <Box marginBlock="8">
            <Heading size="xlarge" spacing>
              Synkroniseringer {env}
            </Heading>
            <BodyLong size="large" textColor="subtle">
              Loading sync data...
            </BodyLong>
          </Box>
        </Box>
        <NovariSnackbar items={alerts} />
      </>
    );
  }
  return (
    <>
      <SyncPage initialData={syncData} env={env} />
      <NovariSnackbar items={alerts} />
    </>
  );
}
