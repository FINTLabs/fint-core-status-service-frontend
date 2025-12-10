import { Box, Table } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, ChevronRightIcon, HeartBrokenIcon, HeartIcon, XMarkIcon } from "@navikt/aksel-icons";
import type { IContractDomain } from "~/types";
import { formatTimestampDetailed } from "~/utils/time";

interface AdapterComponentTableProps {
  data: IContractDomain[];
  onRowClick: (item: IContractDomain) => void;
}

const formatTimestamp = (value?: number | null) => {
  if (!value) return "-";
  return new Date(value).toLocaleString("nb-NO");
};

export function ContractDomainTable({ data, onRowClick }: AdapterComponentTableProps) {
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
            <Table.Row key={`${item.component}-${index}`} data-cy="adapter-detail-table-row" onRowClick={() => onRowClick(item)}>
              <Table.DataCell>
                {item.hasContact ? (
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
                <span className="font-medium">{item.component}</span>
              </Table.DataCell>

              <Table.DataCell>
                {item.lastDeltaSync ? (
                  <span className="text-gray-700" title={formatTimestampDetailed(item.lastDeltaSync)}>
                    {formatTimestamp(item.lastDeltaSync)}
                  </span>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </Table.DataCell>
              <Table.DataCell>
                {item.lastFullSync ? (
                  <span className="text-gray-700" title={formatTimestampDetailed(item.lastFullSync)}>
                    {formatTimestamp(item.lastFullSync)}
                  </span>
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </Table.DataCell>
              <Table.DataCell>
                {item.answersEvents ? (
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
