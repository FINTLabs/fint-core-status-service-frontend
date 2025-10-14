import { Box, Pagination, Table } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, XMarkIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { useNavigate } from "react-router";
import type { IAdaptereTableRow } from "~/types";

interface AdapterTableProps {
  data: IAdaptereTableRow[];
  sortState?: { orderBy: string; direction: "ascending" | "descending" };
  onSortChange: (sortKey: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export function AdapterTable({
  data,
  sortState,
  onSortChange,
  currentPage,
  onPageChange,
  itemsPerPage,
}: AdapterTableProps) {
  const navigate = useNavigate();
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handleRowClick = (adapter: IAdaptereTableRow) => {
    const adapterId = adapter.domain.toLowerCase().replace(/\s+/g, "-");
    navigate(`/adaptere/${adapterId}`, {
      state: {
        selectedAdapter: adapter,
      },
    });
  };

  return (
    <Box background="surface-subtle" padding="space-16" borderRadius="large" shadow="xsmall">
      <Table sort={sortState} onSortChange={onSortChange}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.ColumnHeader sortable sortKey="organisation">
              Organisasjon
            </Table.ColumnHeader>
            <Table.ColumnHeader sortable sortKey="domain">
              Domene
            </Table.ColumnHeader>
            <Table.ColumnHeader sortable sortKey="status">
              Status
            </Table.ColumnHeader>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((adapter, index) => (
            <Table.Row
              key={index}
              onRowClick={() => handleRowClick(adapter)}
              shadeOnHover={true}
              data-cy="adapter-row"
            >
              <Table.DataCell>
                {adapter.status === "ok" ? (
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-md">
                    <CheckmarkCircleFillIcon
                      className="text-green-600"
                      title="OK"
                      fontSize="1.25rem"
                    />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-md">
                    <XMarkIcon className="text-red-600" title="Error" fontSize="1.25rem" />
                  </div>
                )}
              </Table.DataCell>
              <Table.DataCell>{adapter.organisation}</Table.DataCell>
              <Table.DataCell>{adapter.domain}</Table.DataCell>
              <Table.DataCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    adapter.status === "ok"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {adapter.status === "ok" ? "Aktiv" : "Inaktiv"}
                </span>
              </Table.DataCell>
              <Table.DataCell>
                <ChevronRightIcon className="text-gray-400" fontSize="1rem" />
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
