import { Alert, BodyShort, Box, Heading, HStack } from "@navikt/ds-react";
import type { IAdaptereTableRow } from "~/types";

interface AdapterDetailAlertProps {
  adapter: IAdaptereTableRow;
}

export function AdapterDetailAlert({ adapter }: AdapterDetailAlertProps) {
  return (
    <Box marginBlock="4">
      <Alert variant={adapter.status === "ok" ? "success" : "error"}>
        <Heading size="small" spacing>
          Valgt Adapter: {adapter.domain}
        </Heading>
        <HStack gap="space-16" wrap>
          <div className="space-y-1 flex-1 min-w-0">
            <BodyShort>
              <strong>Organisasjon:</strong> {adapter.organisation}
            </BodyShort>
            <BodyShort>
              <strong>Domene:</strong> {adapter.domain}
            </BodyShort>
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <BodyShort>
              <strong>Status:</strong>
              <span
                className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  adapter.status === "ok"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {adapter.status === "ok" ? "Aktiv" : "Inaktiv"}
              </span>
            </BodyShort>
            <BodyShort>
              <strong>Antall komponenter:</strong> {adapter.components.length}
            </BodyShort>
          </div>
        </HStack>
      </Alert>
    </Box>
  );
}
