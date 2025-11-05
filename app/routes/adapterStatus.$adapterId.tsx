import type { Route } from "./+types/adapterStatus.$adapterId";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, type LoaderFunction, useLoaderData } from "react-router";
import type { IAdapterDetailData, IAdaptereTableRow } from "~/types";
import { PageHeader } from "~/components/layout/PageHeader";
import { AdapterDetailAlert } from "~/components/adapters/AdapterDetailAlert";
import { AdapterDetailTable } from "~/components/adapters/AdapterDetailTable";
import AdapterApi from "~/api/AdapterApi";
import { parseEnvironmentFromCookieHeader } from "~/utils/cookies";
import { Box } from "@navikt/ds-react";
import { NovariSnackbar, type NovariSnackbarItem } from "novari-frontend-components";

export function meta({ params }: Route.MetaArgs) {
  return [
    {
      title: `Adapter Detaljer - ${params.adapterId} - Fint Core Status Service`,
    },
    { name: "description", content: "View detailed adapter component status" },
  ];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const cookieHeader = request.headers.get("Cookie");
  const env = parseEnvironmentFromCookieHeader(cookieHeader);
  const { adapterId } = params;

  const response = await AdapterApi.getAdapterDetail(adapterId || "");
  const adapterData = response.data || [];
  return {
    adapterData,
    env,
    adapterId,
    status: response.status,
    customErrorMessage: response.message || "Kunne ikke hente adapter detaljer",
  };
};

export default function AdapterDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { adapterData, env, adapterId, status, customErrorMessage } = useLoaderData() as {
    adapterData: IAdapterDetailData[];
    env: string;
    adapterId: string;
    status: boolean;
    customErrorMessage: string;
  };
  const [mounted, setMounted] = useState(false);
  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  const selectedAdapter = location.state?.selectedAdapter as IAdaptereTableRow | undefined;

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

  const handleRowClick = (component: IAdapterDetailData) => {
    navigate(`/adaptere/${adapterId}/${component.adapterId}`, {
      state: {
        selectedComponent: component,
        selectedAdapter: selectedAdapter,
      },
    });
  };

  const domain = adapterId.charAt(0).toUpperCase() + adapterId.slice(1).replace(/-/g, " ");

  const breadcrumbItems = [
    { label: "Adapter", href: "/adaptere" },
    { label: domain, href: `/adaptere/${adapterId}` },
  ];

  return (
    <>
      <Box padding="8" paddingBlock="2">
        <PageHeader
          title="Adapter Detaljer"
          description={`Komponenter for ${domain}`}
          env={env}
          breadcrumbItems={breadcrumbItems}
        />

        {mounted && selectedAdapter && <AdapterDetailAlert adapter={selectedAdapter} />}

        <AdapterDetailTable data={adapterData} onRowClick={handleRowClick} />
      </Box>
      <NovariSnackbar items={alerts} />
    </>
  );
}
