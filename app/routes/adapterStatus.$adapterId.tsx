import type { Route } from "./+types/adapterStatus.$adapterId";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, type LoaderFunction, useLoaderData } from "react-router";
import type { IAdapterDetailData, IAdaptereTableRow } from "~/types";
import { PageHeader } from "~/components/layout/PageHeader";
import { AdapterDetailAlert } from "~/components/adapters/AdapterDetailAlert";
import { AdapterDetailTable } from "~/components/adapters/AdapterDetailTable";
import AdaptereApi from "./api/AdaptereApi";
import { parseEnvironmentFromCookieHeader } from "~/utils/cookies";
import { Box } from "@navikt/ds-react";

export function meta({ params }: Route.MetaArgs) {
  return [
    {
      title: `Adapter Detaljer - ${params.adapterId} - Fint Core Status Service`,
    },
    { name: "description", content: "View detailed adapter component status" },
  ];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // console.log('request', request);
  const cookieHeader = request.headers.get("Cookie");
  const env = parseEnvironmentFromCookieHeader(cookieHeader);
  // console.log('env', env);
  const { adapterId } = params;

  const response = await AdaptereApi.getAdapterDetail(adapterId || "");
  const adapterData = response.data || [];
  return { adapterData, env, adapterId };
};

export default function AdaptereDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { adapterData, env, adapterId } = useLoaderData();
  const [mounted, setMounted] = useState(false);

  // Get the selected adapter data from navigation state
  const selectedAdapter = location.state?.selectedAdapter as IAdaptereTableRow | undefined;

  // Ensure hydration consistency by only showing state-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRowClick = (component: IAdapterDetailData) => {
    // Pass both the component data and selected adapter data via state
    navigate(`/adaptere/${adapterId}/${component.adapterId}`, {
      state: {
        selectedComponent: component,
        selectedAdapter: selectedAdapter,
      },
    });
  };

  // Decode the adapter ID to get domain name
  const domain = adapterId.charAt(0).toUpperCase() + adapterId.slice(1).replace(/-/g, " ");

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: "Adapter", href: "/adaptere" },
    { label: domain, href: `/adaptere/${adapterId}` },
  ];

  return (
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
  );
}
