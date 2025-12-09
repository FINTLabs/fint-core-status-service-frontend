import { Box, Table } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, XMarkIcon, ChevronRightIcon, HeartIcon, HeartBrokenIcon } from "@navikt/aksel-icons";
import type { IAdapterComponent } from "~/types";
import { formatTimestampDetailed } from "~/utils/time";
import { useNavigate } from "react-router";

interface AdapterComponentTableProps {
  data: IAdapterComponent[];
}

const formatTimestamp = (value?: number | null) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("nb-NO");
};

export function AdapterComponentTable({ data }: AdapterComponentTableProps) {
  const nav = useNavigate();

  function handleRowClick(item: IAdapterComponent) {
    nav(`/contract/${item.orgId}/${item.component}`);
  }

  return (
    <Box background="surface-subtle" padding="space-16" borderRadius="large" shadow="xsmall">
      <Table zebraStripes={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Heartbeat</Table.HeaderCell>
            <Table.HeaderCell>Ressurs</Table.HeaderCell>

            <Table.HeaderCell>Siste Delta</Table.HeaderCell>
            <Table.HeaderCell>Siste Full</Table.HeaderCell>
            <Table.HeaderCell>Besvarer hendelser</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item, index) => (
            <Table.Row key={`${item.orgId}-${item.component}-${item.resource}-${index}`} data-cy="adapter-detail-table-row" onRowClick={() => handleRowClick(item)}>
              <Table.DataCell>
                {item.heartbeat ? (
                  <Box className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-md">
                    <HeartIcon className="text-green-600" title="OK" fontSize="1.25rem" />
                  </Box>
                ) : (
                  <Box className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-md">
                    <HeartBrokenIcon className="text-red-600" title="Error" fontSize="1.25rem" />
                  </Box>
                )}
              </Table.DataCell>
              <Table.DataCell>
                <span className="font-medium">{item.resource}</span>
              </Table.DataCell>

              <Table.DataCell>
                {item.lastDelta ? (
                  <span className="text-gray-700" title={formatTimestampDetailed(item.lastDelta)}>
                    {formatTimestamp(item.lastDelta)}
                  </span>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </Table.DataCell>
              <Table.DataCell>
                {item.lastFull ? (
                  <span className="text-gray-700" title={formatTimestampDetailed(item.lastFull)}>
                    {formatTimestamp(item.lastFull)}
                  </span>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </Table.DataCell>
              <Table.DataCell>
                {item.followsContract ? (
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-md">
                    <CheckmarkCircleFillIcon className="text-green-600" title="Aktiv" fontSize="1.25rem" />
                  </div>
                ) : (
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-md">
                    <XMarkIcon className="text-red-600" title="Inaktiv" fontSize="1.25rem" />
                  </div>
                )}
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
