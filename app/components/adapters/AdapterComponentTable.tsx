import { Box, Table } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, XMarkIcon } from "@navikt/aksel-icons";
import type { IAdapterComponentData } from "~/types";

interface AdapterComponentTableProps {
  data: IAdapterComponentData[];
  onRowClick: (adapterName: string) => void;
}

export function AdapterComponentTable({ data, onRowClick }: AdapterComponentTableProps) {
  return (
    <Box background="surface-subtle" padding="space-16" borderRadius="large" shadow="xsmall">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Adapter</Table.HeaderCell>
            <Table.HeaderCell>Driftspuls</Table.HeaderCell>
            <Table.HeaderCell>Delta overføring</Table.HeaderCell>
            <Table.HeaderCell>Full overføring</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((adapter, index) => (
            <Table.Row
              key={index}
              onRowClick={() => onRowClick(adapter.adapter)}
              shadeOnHover={true}
              data-cy="component-row"
            >
              <Table.DataCell>
                <span className="font-medium">{adapter.adapter}</span>
              </Table.DataCell>
              <Table.DataCell>
                {adapter.heartbeatStatus === "ok" ? (
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
              <Table.DataCell>
                <span className="text-gray-700">{adapter.deltaTransfer || "-"}</span>
              </Table.DataCell>
              <Table.DataCell>
                <span className="text-gray-700">{adapter.fullTransfer || "-"}</span>
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
}
