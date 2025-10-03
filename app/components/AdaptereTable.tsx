import { Box, Table } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, XMarkIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { useNavigate } from "react-router";
import type { AdaptereTableRow } from "../types";

interface AdaptereTableProps {
  data: AdaptereTableRow[];
  sortState?: { orderBy: string; direction: "ascending" | "descending" };
  onSortChange: (sortKey: string) => void;
}

export function AdaptereTable({ data, sortState, onSortChange }: AdaptereTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (adapter: AdaptereTableRow) => {
    // Create a URL-safe identifier from domain
    const adapterId = adapter.domain.toLowerCase().replace(/\s+/g, '-');
    navigate(`/adaptere/${adapterId}`);
  };

  return (
    <Box
      background="surface-subtle"
      padding="space-16"
      borderRadius="large"
      shadow="xsmall"
    >
      <Table sort={sortState} onSortChange={onSortChange}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.ColumnHeader sortable sortKey="organisation">Organisasjon</Table.ColumnHeader>
            <Table.ColumnHeader sortable sortKey="domain">Domene</Table.ColumnHeader>
            <Table.ColumnHeader sortable sortKey="status">Status</Table.ColumnHeader>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((adapter, index) => (
            <Table.Row 
              key={index} 
              onRowClick={() => handleRowClick(adapter)}
              shadeOnHover={true}
            >
              <Table.DataCell>
                {adapter.status === 'ok' ? (
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-md">
                    <CheckmarkCircleFillIcon className="text-green-600" title="OK" fontSize="1.25rem" />
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
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  adapter.status === 'ok' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {adapter.status === 'ok' ? 'Aktiv' : 'Inaktiv'}
                </span>
              </Table.DataCell>
              <Table.DataCell>
                <ChevronRightIcon className="text-gray-400" fontSize="1rem" />
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
}
