import { Box, Pagination, Table, ProgressBar } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, ArrowCirclepathIcon } from "@navikt/aksel-icons";
import type { ISyncData } from "~/types";
import { useState, useMemo } from "react";

interface SyncTableProps {
  data: ISyncData[];
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onRowClick: (sync: ISyncData) => void;
}

export function SyncTable({ data, currentPage, onPageChange, itemsPerPage, onRowClick }: SyncTableProps) {
  const [sort, setSort] = useState<{ orderBy: string; direction: "ascending" | "descending" } | undefined>();

  const sortedData = useMemo(() => {
    if (!sort) return data;

    return [...data].sort((a, b) => {
      if (sort.orderBy === "date") {
        const comparison = a.lastPageTime - b.lastPageTime;
        return sort.direction === "ascending" ? comparison : -comparison;
      }
      return 0;
    });
  }, [data, sort]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleSort = (sortKey: string) => {
    setSort((currentSort) => {
      if (!currentSort || currentSort.orderBy !== sortKey) {
        return { orderBy: sortKey, direction: "descending" };
      }
      if (currentSort.direction === "descending") {
        return { orderBy: sortKey, direction: "ascending" };
      }
      return undefined;
    });
  };

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
    <Box background="surface-subtle" padding="space-16" borderRadius="large" shadow="xsmall">
      <Table sort={sort} onSortChange={handleSort}>
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
            <Table.ColumnHeader sortKey="date" sortable>
              Sist oppdatert
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((sync, index) => (
            <Table.Row key={index} data-cy="sync-row" onRowClick={() => onRowClick(sync)} shadeOnHover={true}>
              <Table.DataCell>
                {sync.finished ? (
                  <Box className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-md">
                    <CheckmarkCircleFillIcon className="text-green-600" title="Fullført" fontSize="1.25rem" />
                  </Box>
                ) : (
                  <Box className="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-md">
                    <ArrowCirclepathIcon className="text-yellow-600" title="Pågår" fontSize="1.25rem" />
                  </Box>
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
                    sync.syncType === "FULL" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
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
                <Box className="flex items-center gap-2">
                  <Box className="flex-1">
                    <Box className={sync.finished ? "[--ac-progress-bar-fg:rgb(22_163_74)]" : "[--ac-progress-bar-fg:rgb(202_138_4)]"}>
                      <ProgressBar value={calculateProgress(sync)} size="small" aria-label={`Fremdrift: ${calculateProgress(sync)}%`} />
                    </Box>
                  </Box>
                  <span className="text-xs text-gray-600 min-w-[3rem]">{calculateProgress(sync)}%</span>
                </Box>
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
          <Pagination page={currentPage} onPageChange={onPageChange} count={totalPages} size="small" boundaryCount={1} siblingCount={1} />
        </Box>
      )}
    </Box>
  );
}
