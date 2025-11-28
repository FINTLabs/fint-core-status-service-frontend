import { Modal, Button, Heading, Box, BodyShort, HStack, VStack, Label } from "@navikt/ds-react";
import { HeartIcon, HeartBrokenIcon } from "@navikt/aksel-icons";
import type { IAdaptereTableRow } from "~/types";
import { formatTimestampDetailed } from "~/utils/time";

interface AdapterDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: IAdaptereTableRow | null;
}

export function AdapterDetailModal({ isOpen, onClose, data }: AdapterDetailModalProps) {
  const getHealthStatusColor = (status: string) => {
    const statusUpper = status.toUpperCase();
    if (statusUpper.includes("HEALTHY") || statusUpper.includes("OK")) {
      return "bg-green-100 text-green-800";
    }
    if (statusUpper.includes("ERROR") || statusUpper.includes("FAIL")) {
      return "bg-red-100 text-red-800";
    }
    if (statusUpper.includes("WARNING") || statusUpper.includes("WARN")) {
      return "bg-yellow-100 text-yellow-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  if (!data) return null;

  const heartbeatActive = data.heartBeat ?? false;
  const healthStatus = data.healty || "Ukjent";

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="adapter-detail-modal-title"
      aria-describedby="adapter-detail-modal-description"
      placement="top"
      data-cy="adapter-detail-modal"
    >
      <Modal.Header>
        <Heading id="adapter-detail-modal-title" size="medium">
          Adapter Detaljer
        </Heading>
      </Modal.Header>

      <Modal.Body>
        <VStack id="adapter-detail-modal-description" gap="6">
          {/* Header Section */}
          <Box padding="4" background="surface-subtle" borderRadius="medium">
            <HStack gap="4" align="start" justify="space-between">
              <Box className="flex-1">
                <Heading level="3" size="small">
                  {data.packageName}
                </Heading>
                <BodyShort size="small" textColor="subtle" spacing>
                  {data.organisation}
                </BodyShort>
              </Box>
              <VStack gap="3" align="end">
                <VStack gap="1" align="end">
                  <HStack gap="2" align="center">
                    <BodyShort size="small" weight="semibold">
                      Heartbeat
                    </BodyShort>
                  </HStack>
                  <BodyShort size="small" className={`inline-flex items-center gap-1 ${heartbeatActive ? "text-green-700" : "text-red-700"}`}>
                    {heartbeatActive ? <HeartIcon className="text-green-600" fontSize="1.25rem" /> : <HeartBrokenIcon className="text-red-600" fontSize="1.25rem" />}
                    {heartbeatActive ? "Aktiv" : "Inaktiv"}
                  </BodyShort>
                </VStack>
                <VStack gap="1" align="end">
                  <BodyShort size="small" textColor="subtle">
                    Helsestatus
                  </BodyShort>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(healthStatus)}`}>{healthStatus}</span>
                </VStack>
              </VStack>
            </HStack>
          </Box>

          {/* Sync Information */}
          <Box>
            <Heading level="4" size="small" spacing>
              Synkronisering
            </Heading>
            <VStack gap="4">
              {/* Last Full Sync */}
              <Box padding="4" background="surface-default" borderRadius="medium" borderWidth="1">
                <BodyShort size="small" weight="semibold" spacing>
                  Siste Full Synkronisering
                </BodyShort>
                {data.lastFull ? (
                  <VStack gap="2">
                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Box>
                        <BodyShort size="small" textColor="subtle">
                          Dato og tid:
                        </BodyShort>
                        <BodyShort size="small" weight="semibold" spacing>
                          {formatTimestampDetailed(data.lastFull.date)}
                        </BodyShort>
                      </Box>
                      <Box>
                        <BodyShort size="small" textColor="subtle">
                          Timestamp:
                        </BodyShort>
                        <Box className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">{data.lastFull.date}</Box>
                      </Box>
                      <Box>
                        <BodyShort size="small" textColor="subtle">
                          Status:
                        </BodyShort>
                        <Box className="mt-1">
                          <span className={`font-mono text-xs bg-gray-100 p-2 rounded mt-1 ${getHealthStatusColor(data.lastFull.healty)}`}>{data.lastFull.healty}</span>
                        </Box>
                      </Box>
                      <Box>
                        <BodyShort size="small" textColor="subtle">
                          Forventet dato:
                        </BodyShort>
                        <Box className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">{formatTimestampDetailed(data.lastFull.expectedDate)}</Box>
                      </Box>
                    </Box>
                  </VStack>
                ) : (
                  <BodyShort size="small" textColor="subtle">
                    Ingen full synkronisering registrert
                  </BodyShort>
                )}
              </Box>

              {/* Last Delta Sync */}
              <Box padding="4" background="surface-default" borderRadius="medium" borderWidth="1">
                <BodyShort size="small" weight="semibold" spacing>
                  Siste Delta Synkronisering
                </BodyShort>
                {data.lastDelta ? (
                  <VStack gap="2">
                    <Box className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Box>
                        <BodyShort size="small" textColor="subtle">
                          Dato og tid:
                        </BodyShort>
                        <BodyShort size="small" weight="semibold" spacing>
                          {formatTimestampDetailed(data.lastDelta.date)}
                        </BodyShort>
                      </Box>
                      <Box>
                        <BodyShort size="small" textColor="subtle">
                          Timestamp:
                        </BodyShort>
                        <Box className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">{data.lastDelta.date}</Box>
                      </Box>
                      <Box>
                        <BodyShort size="small" textColor="subtle">
                          Status:
                        </BodyShort>
                        <Box className="mt-1">
                          <span className={`font-mono text-xs bg-gray-100 p-2 rounded mt-1 ${getHealthStatusColor(data.lastDelta.healty)}`}>{data.lastDelta.healty}</span>
                        </Box>
                      </Box>
                      {/*<Box>*/}
                      {/*  <BodyShort size="small" textColor="subtle">*/}
                      {/*    Forventet dato:*/}
                      {/*  </BodyShort>*/}
                      {/*  {data.lastDelta.expectedDate && (*/}
                      {/*    <BodyShort size="small" weight="semibold" spacing>*/}
                      {/*      {formatTimestampDetailed(data.lastDelta.expectedDate)}*/}
                      {/*    </BodyShort>*/}
                      {/*  )}*/}
                      {/*</Box>*/}
                    </Box>
                  </VStack>
                ) : (
                  <BodyShort size="small" textColor="subtle">
                    Ingen delta synkronisering registrert
                  </BodyShort>
                )}
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="tertiary" onClick={onClose} data-cy="adapter-detail-modal-close">
          Lukk
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
