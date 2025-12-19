import { Box, CopyButton, HStack, Loader, Pagination, Table } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, XMarkIcon } from "@navikt/aksel-icons";
import type { IEvent } from "~/types/Event";

interface HendelserTableProps {
  data: IEvent[];
  onRowClick: (event: IEvent) => void;
  loading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export function EventsTable({ data, onRowClick, loading, currentPage, onPageChange, itemsPerPage }: HendelserTableProps) {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <Box background="surface-subtle" padding="space-16" borderRadius="large" shadow="xsmall">
      {loading && <Loader size="small" />}
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Hendelse ID</Table.HeaderCell>
            <Table.HeaderCell>Operasjon</Table.HeaderCell>
            <Table.HeaderCell>Organisasjon</Table.HeaderCell>
            <Table.HeaderCell>Ressurser</Table.HeaderCell>
            <Table.HeaderCell>Request Dato</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((event, index) => (
            <Table.Row key={index} onRowClick={() => onRowClick(event)} shadeOnHover={true} data-cy="event-row">
              <Table.DataCell>
                {!event.hasError ? (
                  <Box className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-md">
                    <CheckmarkCircleFillIcon className="text-green-600" title="OK" fontSize="1.25rem" />
                  </Box>
                ) : (
                  <Box className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-md">
                    <XMarkIcon className="text-red-600" title="Error" fontSize="1.25rem" />
                  </Box>
                )}
              </Table.DataCell>
              <Table.DataCell>
                <HStack align="center" gap="2">
                  <CopyButton copyText={event.corrId} size={"small"} />
                  {event.corrId ? `${event.corrId.substring(0, 5)}...${event.corrId.substring(event.corrId.length - 5)}` : "N/A"}
                </HStack>
              </Table.DataCell>
              <Table.DataCell>
                {(() => {
                  if (!event.requestEvent) {
                    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">N/A</span>;
                  }

                  const operationType = event.requestEvent.operationType ? event.requestEvent.operationType.toUpperCase() : "";
                  let bgColor = "bg-gray-100";
                  let textColor = "text-gray-800";

                  if (operationType === "CREATE") {
                    bgColor = "bg-yellow-100";
                    textColor = "text-yellow-800";
                  } else if (operationType === "UPDATE") {
                    bgColor = "bg-blue-100";
                    textColor = "text-blue-800";
                  } else if (operationType === "DELETE") {
                    bgColor = "bg-red-100";
                    textColor = "text-red-800";
                  } else if (operationType === "VALIDATE") {
                    bgColor = "bg-green-100";
                    textColor = "text-green-800";
                  }

                  return (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
                      {event.requestEvent.operationType || "N/A"}
                    </span>
                  );
                })()}
              </Table.DataCell>
              <Table.DataCell>
                <span className="text-gray-700">{event.orgId || "N/A"}</span>
              </Table.DataCell>
              <Table.DataCell>
                <span className="text-gray-700">{event.requestEvent?.resourceName || "N/A"}</span>
              </Table.DataCell>
              <Table.DataCell>
                <span className="text-gray-700">{event.requestEvent?.created ? new Date(event.requestEvent.created).toLocaleString("no-NO") : "N/A"}</span>
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {totalPages > 1 && (
        <Box paddingBlock="4" className="flex justify-center">
          <Pagination page={currentPage} onPageChange={onPageChange} count={totalPages} size="small" boundaryCount={1} siblingCount={1} data-cy="pagination" />
        </Box>
      )}
    </Box>
  );
}
