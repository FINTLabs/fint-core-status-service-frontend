import { EventsPage } from "~/components/events/EventsPage";
import {
  Await,
  type LoaderFunction,
  useAsyncValue,
  useLoaderData,
  useNavigation,
} from "react-router";
import EventsApi from "~/api/EventsApi";
import { selectedEnvCookie } from "~/utils/cookies";
import {
  NovariSnackbar,
  type NovariSnackbarItem,
} from "novari-frontend-components";
import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import { Alert, Box, Loader } from "@navikt/ds-react";
import { PageHeader } from "~/components/layout/PageHeader";
import { BellIcon } from "@navikt/aksel-icons";
import type { IEvent } from "~/types/Event";

export function meta() {
  return [
    { title: "Hendelser - Fint Core Status Service" },
    { name: "description", content: "View event logs and operations" },
  ];
}

//TODO: add metrics
export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const env = await selectedEnvCookie.parse(cookieHeader);

  const eventResponse = EventsApi.getAllEvents(env);

  return { env, eventResponse };
};

export default function Events() {
  const { env, eventResponse } = useLoaderData() as {
    env: string;
    eventResponse: Promise<{
      success: boolean;
      message?: string;
      data?: IEvent[];
    }>;
  };

  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  //TODO: change to a better notice
  if (isNavigating) {
    return <Box>Loading stuff...</Box>;
  }

  //TODO: use suspense on all routes
  return (
    <>
      <PageHeader
        title="Hendelser"
        description="Oversikt over hendelser og deres status i Fint Core systemet."
        env={env}
        icon={BellIcon}
      />
      <Suspense
        fallback={
          <Box className="p-6 flex justify-center">
            <Loader size="3xlarge" title="Laster hendelser ..." />
          </Box>
        }
      >
        <Await
          resolve={eventResponse}
          errorElement={
            <Box className="p-6">
              <Alert variant="error" className="mb-4">
                Kunne ikke hente synkroniseringer.
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
    data?: IEvent[];
  };

  useEffect(() => {
    if (!response?.success) {
      setAlerts((prev) => [
        ...prev,
        {
          id: `sync-error-${Date.now()}`,
          variant: "error",
          message: response?.message || "Kunne ikke hente hendelser.",
          header: "Connection Feil",
        },
      ]);
    }
  }, [response?.success, response?.message, setAlerts]);

  return (
    <>
      <EventsPage initialData={response.data || []} env={env} />
      <NovariSnackbar items={alerts} />
    </>
  );
}
