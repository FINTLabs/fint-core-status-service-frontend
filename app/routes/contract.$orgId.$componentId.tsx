import type { Route } from "./+types/contract.$orgId.$componentId";
import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import { Await, type LoaderFunction, useAsyncValue, useLoaderData, useNavigation } from "react-router";
import type { IContractComponent } from "~/types";
import { PageHeader } from "~/components/layout/PageHeader";
import ContractApi from "~/api/ContractApi";
import { selectedEnvCookie } from "~/utils/cookies";
import { Alert, Box, Loader } from "@navikt/ds-react";
import { InformationSquareIcon } from "@navikt/aksel-icons";
import { NovariSnackbar, type NovariSnackbarItem } from "novari-frontend-components";
import { ContractComponentTable } from "~/components/adapters/ContractComponentTable";

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

  const response = ContractApi.getContractComponent(orgId || "", componentId || "", env);

  return {
    env,
    orgId,
    componentId,
    response,
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

  const { env, orgId, componentId, response } = useLoaderData() as {
    env: string;
    orgId: string;
    componentId: string;
    response: Promise<{ success: boolean; message?: string; data?: IContractComponent[]; variant?: string }>;
  };

  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  if (isNavigating) {
    return <Box>Loading stuff...</Box>;
  }

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
        <Suspense
          fallback={
            <Box className="p-6 flex justify-center">
              <Loader size="3xlarge" title="Laster adaptere ..." />
            </Box>
          }
        >
          <Await
            resolve={response}
            errorElement={
              <Box className="p-6">
                <Alert variant="error" className="mb-4">
                  Kunne ikke hente adaptere.
                </Alert>
              </Box>
            }
          >
            <ContractComponentResolved setAlerts={setAlerts} />
          </Await>
        </Suspense>
        <NovariSnackbar items={alerts} />

        {/*{mounted && <AdapterComponentAlert componentName={componentId} selectedComponent={selectedComponent} selectedAdapter={selectedAdapter} />}*/}

        {/*{selectedAdapterName && <AdapterComponentModal isOpen={isModalOpen} onClose={handleCloseModal} data={modalData} adapterName={selectedAdapterName} loading={loadingModal} />}*/}
      </Box>
    </>
  );
}

// ---------- Child component used inside <Await> ----------
function ContractComponentResolved({ setAlerts }: { setAlerts: React.Dispatch<React.SetStateAction<NovariSnackbarItem[]>> }) {
  const response = useAsyncValue() as {
    success: boolean;
    message?: string;
    data?: IContractComponent[];
    variant?: string;
  };

  useEffect(() => {
    if (!response?.success) {
      setAlerts((prev) => [
        ...prev,
        {
          id: `component-error-${Date.now()}`,
          variant: (response?.variant || "error") as "error" | "warning" | "success" | "info",
          message: response?.message || "Kunne ikke hente adapter komponent detaljer",
          header: "Connection Feil",
        },
      ]);
    }
  }, [response?.success, response?.message, response?.variant, setAlerts]);

  return <ContractComponentTable data={response.data || []} />;
}
