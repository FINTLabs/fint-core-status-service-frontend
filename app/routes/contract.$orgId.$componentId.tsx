import type { Route } from "./+types/contract.$orgId.$componentId";
import { useEffect, useState } from "react";
import { type LoaderFunction, useLoaderData } from "react-router";
import type { IContract } from "~/types";
import { PageHeader } from "~/components/layout/PageHeader";
import AdapterApi from "~/api/AdapterApi";
import { selectedEnvCookie } from "~/utils/cookies";
import { Box } from "@navikt/ds-react";
import { InformationSquareIcon } from "@navikt/aksel-icons";
import { NovariSnackbar, type NovariSnackbarItem } from "novari-frontend-components";
import { AdapterComponentDetailTable } from "~/components/adapters/AdapterComponentDetailTable";

//TODO: fix all meta data
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
  const { orgId, componentId } = params;

  const response = await AdapterApi.getAdapterComponentContract(orgId || "", componentId || "", env);
  const adapterData = response.data || [];

  return {
    adapterData,
    env,
    orgId,
    componentId,
    success: response.success,
    customErrorMessage: response.message || "Kunne ikke hente adapter komponent detaljer",
  };
};

export default function ContractComponent() {
  // const location = useLocation();
  // const [mounted, setMounted] = useState(false);
  //
  // const selectedComponent = location.state?.selectedComponent as IContract | undefined;
  // const selectedAdapter = location.state?.selectedAdapter as IAdapter | undefined;

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedAdapterName, setSelectedAdapterName] = useState<string | null>(null);
  // const [modalData, setModalData] = useState<IAdapterComponent | null>(null);
  // const [loadingModal, setLoadingModal] = useState(false);

  const { adapterData, env, orgId, componentId, success, customErrorMessage } = useLoaderData() as {
    adapterData: IContract[];
    env: string;
    orgId: string;
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

  // const domain = orgId.charAt(0).toUpperCase() + orgId.slice(1).replace(/-/g, " ");

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedAdapterName(null);
  //   setModalData(null);
  // };

  return (
    <>
      <Box padding="8" paddingBlock="2">
        <PageHeader title="Detaljer for komponent " description={`Detaljer for  ${orgId} : ${componentId} `} env={env} icon={InformationSquareIcon} />
        <NovariSnackbar items={alerts} />

        {/*{mounted && <AdapterComponentAlert componentName={componentId} selectedComponent={selectedComponent} selectedAdapter={selectedAdapter} />}*/}

        <AdapterComponentDetailTable data={adapterData} />

        {/*{selectedAdapterName && <AdapterComponentModal isOpen={isModalOpen} onClose={handleCloseModal} data={modalData} adapterName={selectedAdapterName} loading={loadingModal} />}*/}
      </Box>
    </>
  );
}
