import { Box, Loader, Table } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, XMarkIcon } from "@navikt/aksel-icons";
import type { IEventData } from "~/types";

interface HendelserTableProps {
  data: IEventData[];
  onRowClick: (event: IEventData) => void;
  loading: boolean;
}

export function HendelserTable({ data, onRowClick, loading }: HendelserTableProps) {
  return (
    <Box background="surface-subtle" padding="space-16" borderRadius="large" shadow="xsmall">
      {loading && <Loader size="small" />}
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Hendelse ID</Table.HeaderCell>
            <Table.HeaderCell>Operasjon</Table.HeaderCell>
            <Table.HeaderCell>Organisasjon</Table.HeaderCell>
            <Table.HeaderCell>Ressurser</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Overført</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((event, index) => (
            <Table.Row key={index} onRowClick={() => onRowClick(event)} shadeOnHover={true}>
              <Table.DataCell>
                <span className="font-mono text-sm">
                  {event.eventId
                    ? `${event.eventId.substring(0, 5)}...${event.eventId.substring(event.eventId.length - 5)}`
                    : "N/A"}
                </span>
              </Table.DataCell>
              <Table.DataCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {event.operation || "N/A"}
                </span>
              </Table.DataCell>
              <Table.DataCell>
                <span className="text-gray-700">{event.organization || "N/A"}</span>
              </Table.DataCell>
              <Table.DataCell>
                <span className="text-gray-700">{event.resources || "N/A"}</span>
              </Table.DataCell>
              <Table.DataCell>
                {event.status === "ok" ? (
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
                <span className="text-gray-700">{event.transferred || "N/A"}</span>
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
}
