import { EventsPage } from "~/components/events/EventsPage";
import type { IEventData } from "~/types";
import { useLoaderData, type LoaderFunction } from "react-router";
import EventsApi from "~/routes/api/HendelserApi";
import { parseEnvironmentFromCookieHeader } from "~/utils/cookies";
import { useEnvironmentRefresh } from "~/hooks/useEnvironmentRefresh";

export function meta() {
  return [
    { title: "Hendelser - Fint Core Status Service" },
    { name: "description", content: "View event logs and operations" },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  // console.log('request', request);
  const cookieHeader = request.headers.get("Cookie");
  const env = parseEnvironmentFromCookieHeader(cookieHeader);
  // console.log('env', env);

  const response = await EventsApi.getAllEvents();
  // Extract the data from the ApiResponse wrapper
  const eventsData = response.data || [];
  return { eventsData, env };
};

export default function Events() {
  const { eventsData, env } = useLoaderData() as {
    eventsData: IEventData[];
    env: string;
  };
  useEnvironmentRefresh(); // This will revalidate when environment changes

  return <EventsPage initialData={eventsData} env={env} />;
}
