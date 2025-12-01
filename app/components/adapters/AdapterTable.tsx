import { Box, Pagination, Table } from "@navikt/ds-react";
import { HeartBrokenIcon, HeartIcon } from "@navikt/aksel-icons";
import type { IAdapter } from "~/types";

interface AdapterTableProps {
  data: IAdapter[];
  sortState?: { orderBy: string; direction: "ascending" | "descending" };
  onSortChange: (sortKey: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onRowClick?: (row: IAdapter) => void;
}

export function AdapterTable({ data, currentPage, onPageChange, itemsPerPage, onRowClick }: AdapterTableProps) {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handleRowClick = (row: IAdapter) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <Box background="surface-subtle" padding="space-16" borderRadius="large" shadow="xsmall">
      <Table size="small" zebraStripes={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Organisasjon</Table.HeaderCell>
            <Table.HeaderCell scope="col">Domene</Table.HeaderCell>
            <Table.HeaderCell scope="col">Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((row, index) => (
            <Table.Row key={row.organzation + row.domain + index} onClick={() => handleRowClick(row)}>
              <Table.HeaderCell scope="row">{row.organzation}</Table.HeaderCell>
              <Table.DataCell>{row.domain}</Table.DataCell>
              <Table.DataCell>
                {row.status === "OK" ? (
                  <Box className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-md">
                    <HeartIcon className="text-green-600" title="OK" fontSize="1.25rem" />
                  </Box>
                ) : (
                  <Box className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-md">
                    <HeartBrokenIcon className="text-red-600" title="Error" fontSize="1.25rem" />
                  </Box>
                )}
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
