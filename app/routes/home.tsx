import type { Route } from "./+types/home";
import { Box, Heading, BodyLong, LinkCard } from "@navikt/ds-react";
import { InformationSquareIcon, TasklistIcon, ArrowsCirclepathIcon } from "@navikt/aksel-icons";

export function meta(_args: Route.MetaArgs) {
  return [{ title: "Fint Core Status Service" }, { name: "description", content: "Monitor the status of Fint Core services" }];
}

export default function Home() {
  return (
    <Box padding="8" paddingBlock="2">
      <Box className="mb-8">
        <Heading level="1" size="xlarge" spacing>
          Velkommen til Fint Core Status Service
        </Heading>
        <BodyLong size="large" className="text-gray-600">
          Overvåk og følg helsen og statusen til Fint Core-tjenester i sanntid.
        </BodyLong>
      </Box>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
        <li className="h-full">
          <LinkCard className="h-full">
            <LinkCard.Icon>
              <TasklistIcon aria-hidden fontSize="2rem" />
            </LinkCard.Icon>
            <LinkCard.Title as="h2">
              <LinkCard.Anchor href="/adaptere">Adaptere</LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>
              Se oversikt over alle adaptere, deres status, komponenter og helsetilstand. Overvåk driftspuls, delta- og full-overføringer.
            </LinkCard.Description>
          </LinkCard>
        </li>

        <li className="h-full">
          <LinkCard className="h-full">
            <LinkCard.Icon>
              <InformationSquareIcon aria-hidden fontSize="2rem" />
            </LinkCard.Icon>
            <LinkCard.Title as="h2">
              <LinkCard.Anchor href="/hendelser">Hendelser</LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>Følg med på alle hendelser og operasjoner i systemet. Se detaljer om requests, responses og eventuelle feil.</LinkCard.Description>
          </LinkCard>
        </li>

        <li className="h-full">
          <LinkCard className="h-full">
            <LinkCard.Icon>
              <ArrowsCirclepathIcon aria-hidden fontSize="2rem" />
            </LinkCard.Icon>
            <LinkCard.Title as="h2">
              <LinkCard.Anchor href="/sync">Synkronisering</LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>
              Overvåk synkroniseringer i sanntid. Se fremdrift, antall entiteter og sider som er hentet for både full- og delta-synkroniseringer.
            </LinkCard.Description>
          </LinkCard>
        </li>
      </ul>
    </Box>
  );
}
