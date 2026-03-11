import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import {
  Await,
  type LoaderFunction,
  useAsyncValue,
  useLoaderData,
  useNavigation,
  useRevalidator,
  useSearchParams,
} from "react-router";
import SyncApi from "~/api/SyncApi";
import { SyncPage } from "~/components/sync/SyncPage";
import type { ISyncData } from "~/types";
import {
  NovariSnackbar,
  type NovariSnackbarItem,
} from "novari-frontend-components";
import { PageHeader } from "~/components/layout/PageHeader";
import { ArrowsSquarepathIcon, ArrowCirclepathIcon } from "@navikt/aksel-icons";
import { Alert, Box, Button, Loader } from "@navikt/ds-react";
import { selectedEnvCookie } from "~/utils/cookies";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const env = await selectedEnvCookie.parse(cookieHeader);
  const url = new URL(request.url);

  const fromParam = url.searchParams.get("fromDate");
  const toParam = url.searchParams.get("toDate");

  const fromDate =
    fromParam && !Number.isNaN(Number(fromParam))
      ? Number(fromParam)
      : undefined;
  const toDate =
    toParam && !Number.isNaN(Number(toParam)) ? Number(toParam) : undefined;

  const syncResponse = SyncApi.getAllSync(env, { fromDate, toDate });

  return { env, syncResponse };
};

export default function Sync() {
  const { env, syncResponse } = useLoaderData() as {
    env: string;
    syncResponse: Promise<{
      success: boolean;
      message?: string;
      data?: ISyncData[];
    }>;
  };

  const [alerts, setAlerts] = useState<NovariSnackbarItem[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const navigation = useNavigation();
  const revalidator = useRevalidator();
  const isNavigating = Boolean(navigation.location);
  const isRefreshing = revalidator.state === "loading";

  const fromDateParam = searchParams.get("fromDate");
  const toDateParam = searchParams.get("toDate");
  const fromTimestamp =
    fromDateParam && !Number.isNaN(Number(fromDateParam))
      ? Number(fromDateParam)
      : undefined;
  const toTimestamp =
    toDateParam && !Number.isNaN(Number(toDateParam))
      ? Number(toDateParam)
      : undefined;

  const dateRange = {
    from:
      typeof fromTimestamp === "number" ? new Date(fromTimestamp) : undefined,
    to: typeof toTimestamp === "number" ? new Date(toTimestamp) : undefined,
  };

  const handleDateRangeChange = (value: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (value.from) {
      const fromDate = new Date(value.from);
      fromDate.setHours(0, 0, 0, 0);
      nextSearchParams.set("fromDate", String(fromDate.getTime()));
    } else {
      nextSearchParams.delete("fromDate");
    }

    if (value.to) {
      const toDate = new Date(value.to);
      toDate.setHours(23, 59, 59, 999);
      nextSearchParams.set("toDate", String(toDate.getTime()));
    } else {
      nextSearchParams.delete("toDate");
    }

    setSearchParams(nextSearchParams);
  };

  if (isNavigating) {
    return <Box>Loading stuff...</Box>;
  }

  return (
    <>
      <PageHeader
        title="Synkronisering"
        description="Oversikt over synkroniseringer og status i Fint Core systemet."
        env={env}
        icon={ArrowsSquarepathIcon}
        actions={
          <Button
            variant="secondary"
            size="small"
            onClick={() => revalidator.revalidate()}
            loading={isRefreshing}
            icon={<ArrowCirclepathIcon aria-hidden />}
          >
            Oppdater
          </Button>
        }
      />

      <Suspense
        fallback={
          <Box className="p-6 flex justify-center">
            <Loader size="3xlarge" title="Laster synkroniseringer ..." />
          </Box>
        }
      >
        <Await
          resolve={syncResponse}
          errorElement={
            <Alert variant="error" className="mb-4 p-6">
              Kunne ikke hente synkroniseringer.
            </Alert>
          }
        >
          <SyncResolved
            env={env}
            alerts={alerts}
            setAlerts={setAlerts}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
          />
        </Await>
      </Suspense>
    </>
  );
}

// ---------- Child component used inside <Await> ----------
function SyncResolved({
  env,
  alerts,
  setAlerts,
  dateRange,
  onDateRangeChange,
}: {
  env: string;
  alerts: NovariSnackbarItem[];
  setAlerts: React.Dispatch<React.SetStateAction<NovariSnackbarItem[]>>;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onDateRangeChange: (value: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
}) {
  const response = useAsyncValue() as {
    success: boolean;
    message?: string;
    data?: ISyncData[];
  };

  useEffect(() => {
    if (!response?.success) {
      setAlerts((prev) => [
        ...prev,
        {
          id: `sync-error-${Date.now()}`,
          variant: "error",
          message: response?.message || "Kunne ikke hente synkroniseringer",
          header: "Connection Feil",
        },
      ]);
    }
  }, [response?.success, response?.message, setAlerts]);

  return (
    <>
      <SyncPage
        initialData={response?.data ?? []}
        env={env}
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
      />
      <NovariSnackbar items={alerts} />
    </>
  );
}
