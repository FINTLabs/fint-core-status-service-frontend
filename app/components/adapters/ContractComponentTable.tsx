import { Box, Table } from "@navikt/ds-react";
import { HeartBrokenIcon, HeartIcon } from "@navikt/aksel-icons";
import { formatTimestampDetailed } from "~/utils/time";
import type { IContractComponent } from "~/types";

interface AdapterComponentDetailTableProps {
  data: IContractComponent[];
}

const formatTimestamp = (value?: number | null) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("nb-NO");
};

export function ContractComponentTable({ data }: AdapterComponentDetailTableProps) {
  // Flatten resources from all components
  // const allResources: IAdapterComponentResource[] = [];
  // if (data?.components) {
  //   data.components.forEach((component) => {
  //     if (component.resources && Array.isArray(component.resources)) {
  //       allResources.push(...component.resources);
  //     }
  //   });
  // }
  //
  // const handleRowClick = (resource: IAdapterComponentResource) => {
  //   if (onRowClick) {
  //     onRowClick(resource);
  //   }
  // };

  // function handleRowClick(row: IContract) {
  //   console.log("row click adapter component detail table", row);
  // }

  return (
    <Box background="surface-subtle" padding="space-16" borderRadius="large" shadow="xsmall">
      <Table zebraStripes={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Heartbeat</Table.HeaderCell>
            <Table.HeaderCell>Ressurs</Table.HeaderCell>
            <Table.HeaderCell>Siste Delta</Table.HeaderCell>
            <Table.HeaderCell>Siste Full</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.length === 0 ? (
            <Table.Row>
              <Table.DataCell colSpan={5} className="text-center text-gray-500">
                Ingen ressurser funnet
              </Table.DataCell>
            </Table.Row>
          ) : (
            data.map((row, index) => (
              <Table.Row key={`${row.adapterId}-${index}`} data-cy="adapter-component-detail-table-row">
                <Table.DataCell>
                  {row.heartbeat ? (
                    <Box className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-md">
                      <HeartIcon className="text-green-600" title="Aktiv" fontSize="1.25rem" />
                    </Box>
                  ) : (
                    <Box className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-md">
                      <HeartBrokenIcon className="text-red-600" title="Inaktiv" fontSize="1.25rem" />
                    </Box>
                  )}
                </Table.DataCell>
                <Table.DataCell>
                  <span className="font-medium">{row.adapterId}</span>
                </Table.DataCell>
                <Table.DataCell>
                  {row.lastDelta ? (
                    <span className="text-gray-700" title={formatTimestampDetailed(row.lastDelta)}>
                      {formatTimestamp(row.lastDelta)}
                    </span>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </Table.DataCell>
                <Table.DataCell>
                  {row.lastFull ? (
                    <span className="text-gray-700" title={formatTimestampDetailed(row.lastFull)}>
                      {formatTimestamp(row.lastFull)}
                    </span>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </Table.DataCell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
    </Box>
  );
}
