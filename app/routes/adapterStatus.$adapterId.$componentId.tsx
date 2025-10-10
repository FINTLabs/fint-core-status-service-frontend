import type { Route } from "./+types/adapterStatus.$adapterId.$componentId";
import { useState, useEffect } from "react";
import { useLoaderData, useLocation, type LoaderFunction } from "react-router";
import type { IAdapterDetailData, IAdaptereTableRow, IAdapterComponentModalData } from "~/types";
import { PageHeader } from "~/components/layout/PageHeader";
import { AdapterComponentModal } from "~/components/adapters/AdapterComponentModal";
import { AdapterComponentAlert } from "~/components/adapters/AdapterComponentAlert";
import { AdapterComponentTable } from "~/components/adapters/AdapterComponentTable";
import AdapterApi from "./api/AdapterApi";
import { parseEnvironmentFromCookieHeader } from "~/utils/cookies";
import { Box } from "@navikt/ds-react";

export function meta({ params }: Route.MetaArgs) {
  return [
    {
      title: `Adapter Komponent - ${params.componentId} - Fint Core Status Service`,
    },
    {
      name: "description",
      content: "View detailed adapter component information",
    },
  ];
}

export const loader: LoaderFunction = async ({ request, params }) => {
  // console.log('request', request);
  const cookieHeader = request.headers.get("Cookie");
  const env = parseEnvironmentFromCookieHeader(cookieHeader);
  // console.log('env', env);
  const { adapterId, componentId } = params;

  const response = await AdapterApi.getAdapterComponentDetail(adapterId || "", componentId || "");
  const adapterData = response.data || [];
  return { adapterData, env, adapterId, componentId };
};

export default function AdapterComponent() {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  // Get the selected component and adapter data from navigation state
  const selectedComponent = location.state?.selectedComponent as IAdapterDetailData | undefined;
  const selectedAdapter = location.state?.selectedAdapter as IAdaptereTableRow | undefined;

  // Ensure hydration consistency by only showing state-dependent content after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdapterName, setSelectedAdapterName] = useState<string | null>(null);
  const [modalData, setModalData] = useState<IAdapterComponentModalData | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);

  const { adapterData, env, adapterId, componentId } = useLoaderData();

  // Fetch modal data when an adapter is selected
  useEffect(() => {
    if (selectedAdapterName) {
      const fetchModalData = async () => {
        try {
          setLoadingModal(true);
          const response = await AdapterApi.getAdapterComponentModalData(
            adapterId,
            componentId,
            selectedAdapterName
          );
          setModalData(response.data || null);
        } catch {
          setModalData(null);
        } finally {
          setLoadingModal(false);
        }
      };
      fetchModalData();
    }
  }, [selectedAdapterName, adapterId, componentId]);

  // Decode the component ID to get adapter and component info
  const domain = adapterId.charAt(0).toUpperCase() + adapterId.slice(1).replace(/-/g, " ");

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: "AdapterStatus", href: "/adaptere" },
    { label: domain, href: `/adaptere/${adapterId}` },
    { label: componentId, href: `/adaptere/${adapterId}/${componentId}` },
  ];

  // Modal handlers
  const handleRowClick = (adapterName: string) => {
    setSelectedAdapterName(adapterName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAdapterName(null);
    setModalData(null);
  };

  return (
    <Box padding="8" paddingBlock="2">
      <PageHeader
        title="Adapter Komponent"
        description={`${componentId} for ${domain}`}
        env={env}
        breadcrumbItems={breadcrumbItems}
      />

      {mounted && (
        <AdapterComponentAlert
          componentName={componentId}
          selectedComponent={selectedComponent}
          selectedAdapter={selectedAdapter}
        />
      )}

      <AdapterComponentTable data={adapterData} onRowClick={handleRowClick} />

      {/* Modal */}
      {selectedAdapterName && (
        <AdapterComponentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={modalData}
          adapterName={selectedAdapterName}
          loading={loadingModal}
        />
      )}
    </Box>
  );
}
