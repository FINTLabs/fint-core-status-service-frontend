import { BodyLong, Box, Button, Heading, HStack, Modal, Table, VStack, BodyShort, CopyButton } from "@navikt/ds-react";
import type { ISyncData } from "~/types";

interface SyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  syncData: ISyncData;
}

export function SyncModal({ isOpen, onClose, syncData }: SyncModalProps) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("no-NO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const calculateDuration = (pages: ISyncData["pages"]) => {
    if (pages.length === 0) return "N/A";
    const firstPageTime = pages[0].time;
    const lastPageTime = pages[pages.length - 1].time;
    const durationMs = lastPageTime - firstPageTime;
    const durationSeconds = Math.round(durationMs / 1000);
    if (durationSeconds < 60) {
      return `${durationSeconds} sekunder`;
    }
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = durationSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const calculateProgress = () => {
    return Math.round((syncData.entitiesAquired / syncData.totalEntities) * 100);
  };

  return (
    <Modal open={isOpen} onClose={onClose} width="medium" data-cy="sync-modal" aria-label="Synkronisering Detaljer">
      <Modal.Header>
        <VStack gap="2">
          <Heading level="2" size="medium">
            Synkronisering Detaljer
          </Heading>
          <VStack gap="1">
            <Box>
              <BodyShort size="small" textColor="subtle">
                Correlation ID
              </BodyShort>
              <HStack align="center" gap="2">
                <BodyShort size="small" className="font-mono ">
                  {syncData.corrId}
                </BodyShort>
                <CopyButton copyText={syncData.corrId} size={"small"} />
              </HStack>
            </Box>
            <Box>
              <BodyShort size="small" textColor="subtle">
                Adapter ID
              </BodyShort>
              <BodyShort size="small" className="break-all">
                {syncData.adapterId}
              </BodyShort>
            </Box>
          </VStack>
        </VStack>
      </Modal.Header>

      <Modal.Body>
        <Box>
          {/* Overview Section */}
          <Box marginBlock="4">
            <Heading level="3" size="small" spacing>
              Oversikt
            </Heading>

            <Box className="grid grid-cols-2 gap-4">
              <Box>
                <BodyLong size="small" className="text-gray-500">
                  Organisasjon
                </BodyLong>
                <BodyLong size="small">{syncData.orgId}</BodyLong>
              </Box>

              <Box>
                <BodyLong size="small" className="text-gray-500">
                  Domene
                </BodyLong>
                <BodyLong size="small">{syncData.domain}</BodyLong>
              </Box>

              <Box>
                <BodyLong size="small" className="text-gray-500">
                  Pakke
                </BodyLong>
                <BodyLong size="small">{syncData.package}</BodyLong>
              </Box>

              <Box>
                <BodyLong size="small" className="text-gray-500">
                  Ressurs
                </BodyLong>
                <BodyLong size="small">{syncData.resource}</BodyLong>
              </Box>

              <Box>
                <BodyLong size="small" className="text-gray-500">
                  Type
                </BodyLong>
                <BodyLong size="small">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      syncData.syncType === "FULL" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {syncData.syncType}
                  </span>
                </BodyLong>
              </Box>

              <Box>
                <BodyLong size="small" className="text-gray-500">
                  Status
                </BodyLong>
                <BodyLong size="small">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      syncData.finished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {syncData.finished ? "Fullført" : "Pågår"}
                  </span>
                </BodyLong>
              </Box>

              <Box>
                <BodyLong size="small" className="text-gray-500">
                  Fremdrift
                </BodyLong>
                <BodyLong size="small">
                  {syncData.entitiesAquired} / {syncData.totalEntities} entiteter ({calculateProgress()}%)
                </BodyLong>
              </Box>

              <Box>
                <BodyLong size="small" className="text-gray-500">
                  Sider
                </BodyLong>
                <BodyLong size="small">
                  {syncData.pagesAcquired} / {syncData.totalPages} sider
                </BodyLong>
              </Box>

              <Box>
                <BodyLong size="small" className="text-gray-500">
                  Varighet
                </BodyLong>
                <BodyLong size="small">{calculateDuration(syncData.pages)}</BodyLong>
              </Box>

              <Box>
                <BodyLong size="small" className="text-gray-500">
                  Sist oppdatert
                </BodyLong>
                <BodyLong size="small">{formatTime(syncData.lastPageTime)}</BodyLong>
              </Box>
            </Box>
          </Box>

          {/* Pages Table */}
          <Box marginBlock="4">
            <Heading level="3" size="small" spacing>
              Sider ({syncData.pages.length})
            </Heading>

            <Table size="small">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Side Nr.</Table.HeaderCell>
                  <Table.HeaderCell>Størrelse</Table.HeaderCell>
                  <Table.HeaderCell>Tidspunkt</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {syncData.pages.map((page, index) => (
                  <Table.Row key={index}>
                    <Table.DataCell>{page.pageNumber}</Table.DataCell>
                    <Table.DataCell>{page.pageSize} entiteter</Table.DataCell>
                    <Table.DataCell>{formatTime(page.time)}</Table.DataCell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Box>
        </Box>
      </Modal.Body>

      <Modal.Footer>
        <HStack gap="4" justify="end">
          <Button variant="tertiary" onClick={onClose} data-cy="sync-modal-close">
            Lukk
          </Button>
        </HStack>
      </Modal.Footer>
    </Modal>
  );
}
