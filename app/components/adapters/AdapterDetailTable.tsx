import { Box, Table } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, XMarkIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import type { IAdapterDetailData } from "~/types";

interface AdapterDetailTableProps {
  data: IAdapterDetailData[];
  onRowClick: (component: IAdapterDetailData) => void;
}

export function AdapterDetailTable({ data, onRowClick }: AdapterDetailTableProps) {
  console.log(data);
  return (
    <Box background="surface-subtle" padding="space-16" borderRadius="large" shadow="xsmall">
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Adapter</Table.HeaderCell>
            <Table.HeaderCell>Heartbeat</Table.HeaderCell>
            <Table.HeaderCell>Delta</Table.HeaderCell>
            <Table.HeaderCell>Full Status</Table.HeaderCell>
            <Table.HeaderCell>Full Date</Table.HeaderCell>
            <Table.HeaderCell>Expected Date</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((component, index) => (
            <Table.Row
              key={index}
              onRowClick={() => onRowClick(component)}
              shadeOnHover={true}
              data-cy="adapter-detail-table-row"
            >
              <Table.DataCell>
                <span className="font-medium">{component.adapterId}</span>
              </Table.DataCell>
              <Table.DataCell>
                {component.heartbeat ? (
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
                <span className="text-gray-700">{component.delta}</span>
              </Table.DataCell>
              <Table.DataCell>
                {component.full.healthy ? (
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
                <span className="text-gray-700">{component.full.date}</span>
              </Table.DataCell>
              <Table.DataCell>
                <span className="text-gray-700">{component.full.expectedDate}</span>
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
