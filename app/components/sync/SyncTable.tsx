import { Box, Pagination, Table, ProgressBar } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, ArrowCirclepathIcon } from "@navikt/aksel-icons";
import type { ISyncData } from "~/types";

interface SyncTableProps {
  data: ISyncData[];
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export function SyncTable({ data, currentPage, onPageChange, itemsPerPage }: SyncTableProps) {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("no-NO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateProgress = (sync: ISyncData) => {
    return Math.round((sync.entitiesAquired / sync.totalEntities) * 100);
  };

  return (
    <Box padding="space-16" borderRadius="large" shadow="xsmall">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Organisasjon</Table.HeaderCell>
            <Table.HeaderCell>Domene</Table.HeaderCell>
            <Table.HeaderCell>Pakke</Table.HeaderCell>
            <Table.HeaderCell>Ressurs</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Entiteter</Table.HeaderCell>
            <Table.HeaderCell>Sider</Table.HeaderCell>
            <Table.HeaderCell>Fremdrift</Table.HeaderCell>
            <Table.HeaderCell>Sist oppdatert</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((sync, index) => (
            <Table.Row key={index} data-cy="sync-row">
              <Table.DataCell>
                {sync.finished ? (
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-md">
                    <CheckmarkCircleFillIcon
                      className="text-green-600"
                      title="Fullført"
                      fontSize="1.25rem"
                    />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-md">
                    <ArrowCirclepathIcon
                      className="text-yellow-600"
                      title="Pågår"
                      fontSize="1.25rem"
                    />
                  </div>
                )}
              </Table.DataCell>
              <Table.DataCell>{sync.orgId}</Table.DataCell>
              <Table.DataCell>{sync.domain}</Table.DataCell>
              <Table.DataCell>{sync.package}</Table.DataCell>
              <Table.DataCell>
                <span className="text-gray-700">{sync.resource}</span>
              </Table.DataCell>
              <Table.DataCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    sync.syncType === "FULL"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {sync.syncType}
                </span>
              </Table.DataCell>
              <Table.DataCell>
                <span className="text-gray-700">
                  {sync.entitiesAquired}/{sync.totalEntities}
                </span>
              </Table.DataCell>
              <Table.DataCell>
                <span className="text-gray-700">
                  {sync.pagesAcquired}/{sync.totalPages}
                </span>
              </Table.DataCell>
              <Table.DataCell>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div
                      className={
                        sync.finished
                          ? "[--ac-progress-bar-fg:rgb(22_163_74)]"
                          : "[--ac-progress-bar-fg:rgb(202_138_4)]"
                      }
                    >
                      <ProgressBar
                        value={calculateProgress(sync)}
                        size="small"
                        aria-label={`Fremdrift: ${calculateProgress(sync)}%`}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 min-w-[3rem]">
                    {calculateProgress(sync)}%
                  </span>
                </div>
              </Table.DataCell>
              <Table.DataCell>
                <span className="text-gray-700 text-sm">{formatTime(sync.lastPageTime)}</span>
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {totalPages > 1 && (
        <Box paddingBlock="4" className="flex justify-center" data-cy="pagination">
          <Pagination
            page={currentPage}
            onPageChange={onPageChange}
            count={totalPages}
            size="small"
            boundaryCount={1}
            siblingCount={1}
          />
        </Box>
      )}
    </Box>
  );
}
