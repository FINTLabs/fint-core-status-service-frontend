import { Box, Pagination, Table } from "@navikt/ds-react";
import { CheckmarkCircleIcon, ExclamationmarkTriangleIcon } from "@navikt/aksel-icons";
import type { IContractStatus } from "~/types";

interface AdapterTableProps {
  data: IContractStatus[];
  sortState?: { orderBy: string; direction: "ascending" | "descending" };
  onSortChange: (sortKey: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onRowClick: (adapter: IContractStatus) => void;
}

export function AdapterTable({ data, currentPage, onPageChange, itemsPerPage, onRowClick }: AdapterTableProps) {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <Box background="surface-subtle" padding="space-16" borderRadius="large" shadow="xsmall">
      <Table zebraStripes={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Status</Table.HeaderCell>
            <Table.HeaderCell scope="col">Organisasjon</Table.HeaderCell>
            <Table.HeaderCell scope="col">Domene</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((row, index) => (
            <Table.Row key={row.organzation + row.domain + index} onRowClick={() => onRowClick(row)}>
              <Table.DataCell>
                {row.status === "NO_HEARTBEAT" ? (
                  <Box className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-md">
                    <ExclamationmarkTriangleIcon className="text-red-600" title="Error" fontSize="1.25rem" />
                  </Box>
                ) : (
                  <Box className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-md">
                    <CheckmarkCircleIcon className="text-green-600" title="OK" fontSize="1.25rem" />
                  </Box>
                )}
              </Table.DataCell>
              <Table.HeaderCell scope="row">{row.organzation}</Table.HeaderCell>
              <Table.DataCell>{row.domain}</Table.DataCell>
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
