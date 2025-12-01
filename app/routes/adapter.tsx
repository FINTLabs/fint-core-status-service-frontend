import { Await, type LoaderFunction, useAsyncValue, useLoaderData, useNavigation } from "react-router";
import { selectedEnvCookie } from "~/utils/cookies";
import { NovariSnackbar, type NovariSnackbarItem } from "novari-frontend-components";
import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import { Alert, Box, Loader } from "@navikt/ds-react";
import { PageHeader } from "~/components/layout/PageHeader";
import { ComponentIcon } from "@navikt/aksel-icons";
import AdapterApi from "~/api/AdapterApi";
import type { IAdapter } from "~/types";
import { AdapterPage } from "~/components/adapters/AdapterPage";

export function meta() {
  return [{ title: "Adaptere - Fint Core Status Service" }, { name: "description", content: "View adapter status and configuration" }];
}

//TODO: add metrics
export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const env = await selectedEnvCookie.parse(cookieHeader);

  const adapterResponse = AdapterApi.getAllAdapters(env);

  return { env, adapterResponse };
};

export default function Adapter() {
  const { env, adapterResponse } = useLoaderData() as {
    env: string;
    adapterResponse: Promise<{ success: boolean; message?: string; data?: IAdapter[] }>;
  };

  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Adaptere", href: "/adaptere" },
  ];

  if (isNavigating) {
    return <Box>Loading stuff...</Box>;
  }

  return (
    <>
      <PageHeader title="Adaptere" description="Oversikt over adaptere og deres status i Fint Core systemet." env={env} breadcrumbItems={breadcrumbItems} icon={ComponentIcon} />
      <Suspense
        fallback={
          <Box className="p-6 flex justify-center">
            <Loader size="3xlarge" title="Laster adaptere ..." />
          </Box>
        }
      >
        <Await
          resolve={adapterResponse}
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
function SyncResolved({ env, alerts, setAlerts }: { env: string; alerts: NovariSnackbarItem[]; setAlerts: React.Dispatch<React.SetStateAction<NovariSnackbarItem[]>> }) {
  const response = useAsyncValue() as {
    success: boolean;
    message?: string;
    data?: IAdapter[];
  };

  useEffect(() => {
    if (!response?.success) {
      setAlerts((prev) => [
        ...prev,
        {
          id: `sync-error-${Date.now()}`,
          variant: "error",
          message: response?.message || "Kunne ikke hente adapters.",
          header: "Connection Feil",
        },
      ]);
    }
  }, [response?.success, response?.message, setAlerts]);

  return (
    <>
      <AdapterPage initialData={response.data || []} env={env} />
      <NovariSnackbar items={alerts} />
    </>
  );
}
