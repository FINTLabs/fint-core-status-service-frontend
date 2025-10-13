import { useLoaderData } from "react-router";
import type { Route } from "./+types/sync";
import SyncApi from "./api/SyncApi";
import { SyncPage } from "~/components/sync/SyncPage";
import type { ISyncData } from "~/types";
import { useEnvironment } from "~/hooks/useEnvironment";
import { useEnvironmentRefresh } from "~/hooks/useEnvironmentRefresh";

// Wait for MSW to be ready before making API calls
async function waitForMSW() {
  if (import.meta.env.DEV && typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    while (!(window as any).__mswReady) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }
}

export async function clientLoader() {
  await waitForMSW();
  const response = await SyncApi.getAllSync();
  return { syncData: response.data || [] };
}

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Synkronisering - Fint Core Status Service" },
    { name: "description", content: "Oversikt over synkroniseringer i Fint Core" },
  ];
}

export default function Sync() {
  const syncData = useLoaderData<{ syncData: ISyncData[] }>().syncData;
  const currentEnvironment = useEnvironment();

  useEnvironmentRefresh(); // This will revalidate when environment changes

  return <SyncPage initialData={syncData} env={currentEnvironment} />;
}
