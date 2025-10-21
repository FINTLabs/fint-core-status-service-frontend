import { EventsPage } from "~/components/events/EventsPage";
import type { IEventData } from "~/types";
import { useLoaderData, type LoaderFunction } from "react-router";
import EventsApi from "~/routes/api/EventsApi";
import { parseEnvironmentFromCookieHeader } from "~/utils/cookies";
import { useEnvironmentRefresh } from "~/hooks/useEnvironmentRefresh";
import { NovariSnackbar, type NovariSnackbarItem } from "novari-frontend-components";
import { useEffect, useState } from "react";
import { Box, Heading, BodyLong } from "@navikt/ds-react";

export function meta() {
  return [
    { title: "Hendelser - Fint Core Status Service" },
    { name: "description", content: "View event logs and operations" },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const env = parseEnvironmentFromCookieHeader(cookieHeader);

  const response = await EventsApi.getAllEvents();
  const eventsData = response.data || [];
  return {
    eventsData,
    env,
    success: response.success,
    customErrorMessage: response.message || "Kunne ikke hente hendelser",
  };
};

export default function Events() {
  const { eventsData, env, success, customErrorMessage } = useLoaderData() as {
    eventsData: IEventData[];
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
          id: `events-error-${Date.now()}`,
          variant: success ? "success" : "error",
          message: customErrorMessage,
          header: "Connection Feil",
        },
      ]);
    }
  }, [customErrorMessage, success]);

  if (!eventsData || eventsData.length === 0) {
    return (
      <>
        <Box padding="8" paddingBlock="2">
          <Box marginBlock="8">
            <Heading size="xlarge" spacing>
              Hendelser {env}
            </Heading>
            <BodyLong size="large" textColor="subtle">
              Loading events data...
            </BodyLong>
          </Box>
        </Box>
        <NovariSnackbar items={alerts} />
      </>
    );
  }
  return (
    <>
      <EventsPage initialData={eventsData} env={env} />
      <NovariSnackbar items={alerts} />
    </>
  );
}
