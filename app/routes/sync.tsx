import { type LoaderFunction, useLoaderData } from "react-router";
import type { Route } from "./+types/sync";
import SyncApi from "./api/SyncApi";
import { SyncPage } from "~/components/sync/SyncPage";
import type { ISyncData } from "~/types";
import { useEnvironmentRefresh } from "~/hooks/useEnvironmentRefresh";
import { parseEnvironmentFromCookieHeader } from "~/utils/cookies";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Synkronisering - Fint Core Status Service" },
    { name: "description", content: "Oversikt over synkroniseringer i Fint Core" },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  // console.log('request', request);
  const cookieHeader = request.headers.get("Cookie");
  const env = parseEnvironmentFromCookieHeader(cookieHeader);
  const response = await SyncApi.getAllSync();
  return { syncData: response.data || [], env };
};

export default function Sync() {
  const { syncData, env } = useLoaderData() as {
    syncData: ISyncData[];
    env: string;
  };

  useEnvironmentRefresh();

  return <SyncPage initialData={syncData} env={env} />;
}
