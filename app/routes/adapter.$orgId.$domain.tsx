import type { Route } from "./+types/adapter.$orgId.$domain";
import { useEffect, useState } from "react";
import { type LoaderFunction, useLoaderData, useLocation } from "react-router";
import type { IAdapter, IAdapterComponent } from "~/types";
import { PageHeader } from "~/components/layout/PageHeader";
import AdapterApi from "~/api/AdapterApi";
import { selectedEnvCookie } from "~/utils/cookies";
import { Box } from "@navikt/ds-react";
import { LayersIcon } from "@navikt/aksel-icons";
import { NovariSnackbar, type NovariSnackbarItem } from "novari-frontend-components";
import { AdapterComponentTable } from "~/components/adapters/AdapterComponentTable";

//TODO: fix all meta data
export function meta({ params }: Route.MetaArgs) {
  return [
    {
      title: `Status adaptere pr komponent - ${params.orgId} - Fint Core Status Service`,
    },
    { name: "description", content: "View detailed adapter component status" },
  ];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const cookieHeader = request.headers.get("Cookie");
  const env = (await selectedEnvCookie.parse(cookieHeader)) || "api";
  const { orgId, domain } = params;

  const response = await AdapterApi.getAdapterComponent(orgId || "", domain || "", env);

  console.log("response adapter component", response.data);
  return {
    data: response.data || [],
    env,
    orgId,
    domain,
    status: response.status,
    customErrorMessage: response.message || "Kunne ikke hente adapter detaljer",
  };
};

export default function AdapterDetail() {
  const location = useLocation();
  const { data, env, orgId, domain, status, customErrorMessage } = useLoaderData() as {
    data: IAdapterComponent[];
    env: string;
    orgId: string;
    domain: string;
    status: boolean;
    customErrorMessage: string;
  };
  const [mounted, setMounted] = useState(false);
  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  const selectedAdapter = location.state?.selectedAdapter as IAdapter | undefined;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!status) {
      setAlerts([
        {
          id: `adapter-detail-success-${Date.now()}`,
          variant: "success",
          message: "Adapter detaljer hentet vellykket",
        },
      ]);
    }
  }, [status, customErrorMessage]);

  // const domainDisplay = domain.charAt(0).toUpperCase() + domain.slice(1).replace(/-/g, " ");

  return (
    <>
      <Box padding="8" paddingBlock="2">
        <PageHeader title="Status adaptere pr komponent" description={`Komponenter for ${orgId} : ${domain}`} env={env} icon={LayersIcon} />

        {/*{mounted && selectedAdapter && <AdapterDetailAlert adapter={selectedAdapter} />}*/}

        <AdapterComponentTable data={data} />
      </Box>
      <NovariSnackbar items={alerts} />
    </>
  );
}
