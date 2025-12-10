import { Await, type LoaderFunction, useAsyncValue, useLoaderData, useNavigation } from "react-router";
import { selectedEnvCookie } from "~/utils/cookies";
import { NovariSnackbar, type NovariSnackbarItem } from "novari-frontend-components";
import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import { Alert, Box, Loader } from "@navikt/ds-react";
import { PageHeader } from "~/components/layout/PageHeader";
import { ComponentIcon } from "@navikt/aksel-icons";
import ContractApi from "~/api/ContractApi";
import type { IContractStatus } from "~/types";
import { AdapterPage } from "~/components/adapters/AdapterPage";

export function meta() {
  return [{ title: "Adaptere - Fint Core Status Service" }, { name: "description", content: "View adapter status and configuration" }];
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const env = await selectedEnvCookie.parse(cookieHeader);

  const response = ContractApi.getContractStatus(env);

  return { env, response };
};

export default function Adapter() {
  const { env, response } = useLoaderData() as {
    env: string;
    response: Promise<{ success: boolean; message?: string; data?: IContractStatus[]; variant?: string }>;
  };

  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  if (isNavigating) {
    return <Box>Loading stuff...</Box>;
  }

  return (
    <>
      <PageHeader title="Status adaptere" description="Oversikt over adaptere og status i Fint Core systemet." env={env} icon={ComponentIcon} />
      <Suspense
        fallback={
          <Box className="p-6 flex justify-center">
            <Loader size="3xlarge" title="Laster adaptere ..." />
          </Box>
        }
      >
        <Await
          resolve={response}
          errorElement={
            <Box className="p-6">
              <Alert variant="error" className="mb-4">
                Kunne ikke hente adaptere.
              </Alert>
            </Box>
          }
        >
          <SyncResolved env={env} alerts={alerts} setAlerts={setAlerts} />
        </Await>
      </Suspense>
    </>
  );
}

// ---------- Child component used inside <Await> ----------
function SyncResolved({ alerts, setAlerts }: { env: string; alerts: NovariSnackbarItem[]; setAlerts: React.Dispatch<React.SetStateAction<NovariSnackbarItem[]>> }) {
  const response = useAsyncValue() as {
    success: boolean;
    message?: string;
    data?: IContractStatus[];
    variant?: string;
  };

  useEffect(() => {
    if (!response?.success) {
      setAlerts((prev) => [
        ...prev,
        {
          id: `sync-error-${Date.now()}`,
          variant: (response?.variant || "error") as "error" | "warning" | "success" | "info",
          message: response?.message || "Kunne ikke hente adapters.",
          header: "Connection Feil",
        },
      ]);
    }
  }, [response?.success, response?.message, response?.variant, setAlerts]);

  return (
    <>
      <AdapterPage initialData={response.data || []} />
      <NovariSnackbar items={alerts} />
    </>
  );
}
