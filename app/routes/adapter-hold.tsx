import { AdapterPage } from "~/components/adapters/AdapterPage";

import { useLoaderData, type LoaderFunction } from "react-router";
import AdapterApi from "~/api/AdapterApi";
import { Heading, BodyLong, Box } from "@navikt/ds-react";
import { NovariSnackbar, type NovariSnackbarItem } from "novari-frontend-components";
import { useEffect, useState } from "react";
import { selectedEnvCookie } from "~/utils/cookies";
import { ComponentIcon } from "@navikt/aksel-icons";
import { PageHeader } from "~/components/layout/PageHeader";
import type { IAdapter } from "~/types";

export function meta() {
  return [{ title: "Adapter - Fint Core Status Service" }, { name: "description", content: "View adapter status and configuration" }];
}

//TODO: set up this page like sync with suspense and await
export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const env = cookieHeader ? await selectedEnvCookie.parse(cookieHeader) : "api";

  const response = await AdapterApi.getAllAdapters(env);
  const adapterData = response.data || {};
  return {
    adapterData,
    env,
    success: response.success,
    customErrorMessage: response.message || "Kunne ikke hente adaptere",
  };
};

export default function Adapter() {
  const { adapterData, env, success, customErrorMessage } = useLoaderData() as {
    adapterData: IAdapter;
    env: string;
    success: boolean;
    customErrorMessage: string;
  };

  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);

  useEffect(() => {
    if (!success) {
      setAlerts([
        {
          id: `adapterStatus-error-${Date.now()}`,
          variant: "error",
          message: customErrorMessage,
          header: "Connection Feil",
        },
      ]);
    }
  }, [customErrorMessage, success]);

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Adaptere", href: "/adaptere" },
  ];
  if (!adapterData || Object.keys(adapterData).length === 0) {
    return (
      <>
        <Box padding="8" paddingBlock="2">
          <Box marginBlock="8">
            <Heading size="xlarge" spacing>
              Adaptere {env}
            </Heading>
            <BodyLong size="large" textColor="subtle">
              Loading adapter data...
            </BodyLong>
          </Box>
        </Box>
        <NovariSnackbar items={alerts} />
      </>
    );
  }

  return (
    <>
      <PageHeader title="Adaptere" description="Oversikt over adaptere og deres status i Fint Core systemet." env={env} breadcrumbItems={breadcrumbItems} icon={ComponentIcon} />
      <AdapterPage initialData={adapterData} env={env} />
      <NovariSnackbar items={alerts} />
    </>
  );
}
