import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import {
  Await,
  type LoaderFunction,
  useAsyncValue,
  useLoaderData,
  useNavigation,
} from "react-router";
import SyncApi from "~/api/SyncApi";
import { SyncPage } from "~/components/sync/SyncPage";
import type { ISyncData } from "~/types";
import {
  NovariSnackbar,
  type NovariSnackbarItem,
} from "novari-frontend-components";
import { PageHeader } from "~/components/layout/PageHeader";
import { ArrowsSquarepathIcon } from "@navikt/aksel-icons";
import { Alert, Box, Loader } from "@navikt/ds-react";
import { selectedEnvCookie } from "~/utils/cookies";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const env = await selectedEnvCookie.parse(cookieHeader);

  const syncResponse = SyncApi.getAllSync(env);

  return { env, syncResponse };
};

export default function Sync() {
  const { env, syncResponse } = useLoaderData() as {
    env: string;
    syncResponse: Promise<{
      success: boolean;
      message?: string;
      data?: ISyncData[];
    }>;
  };

  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  if (isNavigating) {
    return <Box>Loading stuff...</Box>;
  }

  return (
    <>
      <PageHeader
        title="Synkronisering"
        description="Oversikt over synkroniseringer og status i Fint Core systemet."
        env={env}
        icon={ArrowsSquarepathIcon}
      />

      <Suspense
        fallback={
          <Box className="p-6 flex justify-center">
            <Loader size="3xlarge" title="Laster synkroniseringer ..." />
          </Box>
        }
      >
        <Await
          resolve={syncResponse}
          errorElement={
            <Alert variant="error" className="mb-4 p-6">
              Kunne ikke hente synkroniseringer.
            </Alert>
          }
        >
          <SyncResolved env={env} alerts={alerts} setAlerts={setAlerts} />
        </Await>
      </Suspense>
    </>
  );
}

// ---------- Child component used inside <Await> ----------
function SyncResolved({
  env,
  alerts,
  setAlerts,
}: {
  env: string;
  alerts: NovariSnackbarItem[];
  setAlerts: React.Dispatch<React.SetStateAction<NovariSnackbarItem[]>>;
}) {
  const response = useAsyncValue() as {
    success: boolean;
    message?: string;
    data?: ISyncData[];
  };

  useEffect(() => {
    if (!response?.success) {
      setAlerts((prev) => [
        ...prev,
        {
          id: `sync-error-${Date.now()}`,
          variant: "error",
          message: response?.message || "Kunne ikke hente synkroniseringer",
          header: "Connection Feil",
        },
      ]);
    }
  }, [response?.success, response?.message, setAlerts]);

  return (
    <>
      <SyncPage initialData={response?.data ?? []} env={env} />
      <NovariSnackbar items={alerts} />
    </>
  );
}
