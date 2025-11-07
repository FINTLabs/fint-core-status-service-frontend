import type { Route } from "./+types/adapter.$adapterId.$componentId";
import { useEffect, useState } from "react";
import { type LoaderFunction, useLoaderData, useLocation } from "react-router";
import type {
  IAdapterComponentData,
  IAdapterComponentModalData,
  IAdapterDetailData,
  IAdaptereTableRow,
} from "~/types";
import { PageHeader } from "~/components/layout/PageHeader";
import { AdapterComponentModal } from "~/components/adapters/AdapterComponentModal";
import { AdapterComponentAlert } from "~/components/adapters/AdapterComponentAlert";
import { AdapterComponentTable } from "~/components/adapters/AdapterComponentTable";
import AdapterApi from "~/api/AdapterApi";
import { selectedEnvCookie } from "~/utils/cookies";
import { Box } from "@navikt/ds-react";
import { InformationSquareIcon } from "@navikt/aksel-icons";
import { NovariSnackbar, type NovariSnackbarItem } from "novari-frontend-components";

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
  const cookieHeader = request.headers.get("Cookie");
  const env = (await selectedEnvCookie.parse(cookieHeader)) || "api";
  const { adapterId, componentId } = params;

  const response = await AdapterApi.getAdapterComponentDetail(
    adapterId || "",
    componentId || "",
    env
  );
  const adapterData = response.data || [];
  return {
    adapterData,
    env,
    adapterId,
    componentId,
    success: response.success,
    customErrorMessage: response.message || "Kunne ikke hente adapter komponent detaljer",
  };
};

export default function AdapterComponent() {
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  const selectedComponent = location.state?.selectedComponent as IAdapterDetailData | undefined;
  const selectedAdapter = location.state?.selectedAdapter as IAdaptereTableRow | undefined;

  useEffect(() => {
    setMounted(true);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdapterName, setSelectedAdapterName] = useState<string | null>(null);
  const [modalData, setModalData] = useState<IAdapterComponentModalData | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);

  const { adapterData, env, adapterId, componentId, success, customErrorMessage } =
    useLoaderData() as {
      adapterData: IAdapterComponentData[];
      env: string;
      adapterId: string;
      componentId: string;
      success: boolean;
      customErrorMessage: string;
    };

  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  useEffect(() => {
    if (!success) {
      setAlerts([
        {
          id: `component-error-${Date.now()}`,
          variant: "error",
          message: customErrorMessage,
          header: "Connection Feil",
        },
      ]);
    }
  }, [customErrorMessage, success]);

  useEffect(() => {
    if (selectedAdapterName) {
      const fetchModalData = async () => {
        try {
          setLoadingModal(true);
          const response = await AdapterApi.getAdapterComponentModalData(
            adapterId,
            componentId,
            selectedAdapterName,
            env as "beta" | "api" | "alpha"
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
  }, [selectedAdapterName, adapterId, componentId, env]);

  const domain = adapterId.charAt(0).toUpperCase() + adapterId.slice(1).replace(/-/g, " ");

  const breadcrumbItems = [
    { label: "Adapter", href: "/adaptere" },
    { label: domain, href: `/adaptere/${adapterId}` },
    { label: componentId, href: `/adaptere/${adapterId}/${componentId}` },
  ];

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
    <>
      <Box padding="8" paddingBlock="2">
        <PageHeader
          title="Adapter Komponent"
          description={`${componentId} for ${domain}`}
          env={env}
          breadcrumbItems={breadcrumbItems}
          icon={InformationSquareIcon}
        />

        {mounted && (
          <AdapterComponentAlert
            componentName={componentId}
            selectedComponent={selectedComponent}
            selectedAdapter={selectedAdapter}
          />
        )}

        <AdapterComponentTable data={adapterData} onRowClick={handleRowClick} />

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
      <NovariSnackbar items={alerts} />
    </>
  );
}
