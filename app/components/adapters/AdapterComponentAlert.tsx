import { Alert, BodyShort, Box, Heading, HStack } from "@navikt/ds-react";
import type { IAdapterDetailData, IAdaptereTableRow } from "~/types";

interface AdapterComponentAlertProps {
  componentName: string;
  selectedComponent?: IAdapterDetailData;
  selectedAdapter?: IAdaptereTableRow;
}

export function AdapterComponentAlert({
  componentName,
  selectedComponent,
  selectedAdapter,
}: AdapterComponentAlertProps) {
  if (!selectedComponent && !selectedAdapter) {
    return null;
  }

  return (
    <Box marginBlock="4">
      <Alert variant={selectedComponent?.heartbeat ? "success" : "error"}>
        <Heading size="small" spacing>
          Valgt Komponent: {componentName}
        </Heading>
        <HStack gap="space-16" wrap>
          <div className="space-y-1 flex-1 min-w-0">
            {selectedAdapter && (
              <>
                <BodyShort>
                  <strong>Adapter:</strong> {selectedAdapter.domain}
                </BodyShort>
                <BodyShort>
                  <strong>Organisasjon:</strong> {selectedAdapter.organisation}
                </BodyShort>
              </>
            )}
            {selectedComponent && (
              <>
                <BodyShort>
                  <strong>Komponent ID:</strong> {selectedComponent.adapterId}
                </BodyShort>
                <BodyShort>
                  <strong>Heartbeat:</strong>
                  <span
                    className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedComponent.heartbeat
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedComponent.heartbeat ? "Aktiv" : "Inaktiv"}
                  </span>
                </BodyShort>
                <BodyShort>
                  <strong>Delta:</strong> {selectedComponent.delta}
                </BodyShort>
              </>
            )}
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            {selectedComponent && (
              <>
                <BodyShort>
                  <strong>Full Status:</strong>
                  <span
                    className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedComponent.full.healthy
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedComponent.full.healthy ? "OK" : "Feil"}
                  </span>
                </BodyShort>
                <BodyShort>
                  <strong>Full Dato:</strong> {selectedComponent.full.date}
                </BodyShort>
                <BodyShort>
                  <strong>Forventet Dato:</strong> {selectedComponent.full.expectedDate}
                </BodyShort>
              </>
            )}
          </div>
        </HStack>
      </Alert>
    </Box>
  );
}
