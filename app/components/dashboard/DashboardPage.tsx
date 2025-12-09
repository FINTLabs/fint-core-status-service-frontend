import { Box, Heading, BodyShort, Alert } from "@navikt/ds-react";
import type { IStats } from "~/types/Stats";
import { NovariCircularProgressBar } from "novari-frontend-components";

interface DashboardPageProps {
  betaStats: IStats | null;
  apiStats: IStats | null;
  alphaStats: IStats | null;
  betaError?: string;
  apiError?: string;
  alphaError?: string;
}

export function DashboardPage({ betaStats, apiStats, alphaStats, betaError, apiError, alphaError }: DashboardPageProps) {
  const StatCard = ({ title, stats, error }: { title: string; stats: IStats | null; error?: string }) => {
    if (error) {
      return (
        <Box>
          <Box padding="4">
            <Heading level="2" size="medium" spacing>
              {title}
            </Heading>
            <Alert variant="error">{error}</Alert>
          </Box>
        </Box>
      );
    }

    if (!stats) {
      return (
        <Box>
          <Box padding="4">
            <Heading level="2" size="medium" spacing>
              {title}
            </Heading>
            <BodyShort>Ingen data tilgjengelig</BodyShort>
          </Box>
        </Box>
      );
    }

    return (
      <Box>
        <Box padding="4">
          <Heading level="2" size="medium" spacing>
            {title}
          </Heading>
          <Box className="grid grid-cols-1 gap-4 mt-4">
            <Box>
              <BodyShort className="font-semibold">Adapter Kontrakt Antall</BodyShort>
              <BodyShort size="large">{stats.adapterContractAmount}</BodyShort>
            </Box>
            <Box>
              <BodyShort className="font-semibold">Har Kontakt Antall</BodyShort>
              <BodyShort size="large">{stats.hasContectAmount}</BodyShort>
            </Box>
            <Box>
              <BodyShort className="font-semibold">Hendelse Antall</BodyShort>
              <BodyShort size="large">{stats.eventAmount}</BodyShort>
            </Box>
            <Box>
              <BodyShort className="font-semibold">Hendelse Feil</BodyShort>
              <BodyShort size="large">{stats.eventErrors}</BodyShort>
            </Box>
            <Box>
              <BodyShort className="font-semibold">Hendelse Responser</BodyShort>
              <BodyShort size="large">{stats.eventResponses}</BodyShort>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box padding="8" paddingBlock="2">
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="BETA" stats={betaStats} error={betaError} />
        <StatCard title="API" stats={apiStats} error={apiError} />
        <StatCard title="ALPHA" stats={alphaStats} error={alphaError} />
      </Box>
      <NovariCircularProgressBar maxValue={betaStats?.adapterContractAmount || 0} value={betaStats?.hasContectAmount || 0}/>
    </Box>
  );
}

