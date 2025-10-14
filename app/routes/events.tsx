import { EventsPage } from "~/components/events/EventsPage";
import type { IEventData } from "~/types";
import { useLoaderData, type LoaderFunction } from "react-router";
import EventsApi from "~/routes/api/EventsApi";
import { parseEnvironmentFromCookieHeader } from "~/utils/cookies";
import { useEnvironmentRefresh } from "~/hooks/useEnvironmentRefresh";

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
  return { eventsData, env };
};

export default function Events() {
  const { eventsData, env } = useLoaderData() as {
    eventsData: IEventData[];
    env: string;
  };
  useEnvironmentRefresh();

  return <EventsPage initialData={eventsData} env={env} />;
}
