import { Box, Pagination, Table } from "@navikt/ds-react";
import { HeartIcon, HeartBrokenIcon } from "@navikt/aksel-icons";
import type { IAdaptereTableRow } from "~/types";

interface AdapterTableProps {
  data: IAdaptereTableRow[];
  sortState?: { orderBy: string; direction: "ascending" | "descending" };
  onSortChange: (sortKey: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onRowClick?: (row: IAdaptereTableRow) => void;
}

const formatTimestamp = (value?: number | null) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("nb-NO");
};

export function AdapterTable({ data, sortState, onSortChange, currentPage, onPageChange, itemsPerPage, onRowClick }: AdapterTableProps) {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handleRowClick = (row: IAdaptereTableRow) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <Box background="surface-subtle" padding="space-16" borderRadius="large" shadow="xsmall">
      <Table sort={sortState} onSortChange={onSortChange}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Heartbeat</Table.HeaderCell>
            <Table.ColumnHeader sortable sortKey="organisation">
              Organisasjon
            </Table.ColumnHeader>
            <Table.ColumnHeader sortable sortKey="packageName">
              Pakke
            </Table.ColumnHeader>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Sist full synk</Table.HeaderCell>
            <Table.HeaderCell>Sist delta synk</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((row, index) => {
            const heartbeatActive = row.heartBeat ?? false;
            const healthStatus = row.healty || "Ukjent";

            return (
              <Table.Row key={`${row.organisation}-${row.packageName}-${index}`} onRowClick={() => handleRowClick(row)} shadeOnHover={true} data-cy="adapter-row">
                <Table.DataCell>
                  {heartbeatActive ? (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-md">
                      <HeartIcon className="text-green-600" title="Heartbeat Active" fontSize="1.25rem" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-md">
                      <HeartBrokenIcon className="text-red-600" title="Heartbeat Inactive" fontSize="1.25rem" />
                    </div>
                  )}
                </Table.DataCell>
                <Table.DataCell>{row.organisation}</Table.DataCell>
                <Table.DataCell>{row.packageName}</Table.DataCell>
                <Table.DataCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      heartbeatActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {healthStatus}
                  </span>
                </Table.DataCell>
                <Table.DataCell>{formatTimestamp(row.lastFull?.date)}</Table.DataCell>
                <Table.DataCell>{formatTimestamp(row.lastDelta?.date)}</Table.DataCell>
              </Table.Row>
            );
          })}
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
