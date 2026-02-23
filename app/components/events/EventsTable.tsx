import {
  Box,
  CopyButton,
  HStack,
  Loader,
  Pagination,
  Table,
  Tag,
} from "@navikt/ds-react";
import {
  CheckmarkCircleFillIcon,
  XMarkOctagonFillIcon,
} from "@navikt/aksel-icons";
import type { IEvent } from "~/types/Event";

interface HendelserTableProps {
  data: IEvent[];
  onRowClick: (event: IEvent) => void;
  loading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export function EventsTable({
  data,
  onRowClick,
  loading,
  currentPage,
  onPageChange,
  itemsPerPage,
}: HendelserTableProps) {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <Box>
      <Box
        padding="space-16"
        borderRadius="8"
        shadow="dialog"
        marginBlock={"space-16"}
      >
        {loading && <Loader size="small" />}
        <Table size="small" zebraStripes={true}>
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
              <Table.Row
                key={index}
                onRowClick={() => onRowClick(event)}
                shadeOnHover={true}
                data-cy="event-row"
              >
                <Table.DataCell>
                  {!event.hasError ? (
                    <CheckmarkCircleFillIcon
                      title="OK"
                      fontSize="1.5rem"
                      color="var(--ax-bg-success-strong)"
                    />
                  ) : (
                    <XMarkOctagonFillIcon
                      title="Error"
                      fontSize="1.25rem"
                      color="var(--ax-bg-danger-strong)"
                    />
                  )}
                </Table.DataCell>
                <Table.DataCell>
                  <HStack align="center" gap="space-8">
                    <CopyButton copyText={event.corrId} size={"small"} />
                    {event.corrId
                      ? `${event.corrId.substring(0, 5)}...${event.corrId.substring(event.corrId.length - 5)}`
                      : "N/A"}
                  </HStack>
                </Table.DataCell>
                <Table.DataCell>
                  {(() => {
                    if (!event.requestEvent) {
                      return (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ax-neutral-200 text-ax-neutral-900">
                          N/A
                        </span>
                      );
                    }

                    const operationType =
                      event.requestEvent.operationType?.toUpperCase() ?? "";

                    const colorMap: Record<
                      string,
                      "neutral" | "info" | "success" | "warning" | "danger"
                    > = {
                      CREATE: "warning",
                      UPDATE: "info",
                      DELETE: "danger",
                      VALIDATE: "success",
                    };

                    const color = colorMap[operationType] ?? "neutral";

                    return (
                      <Tag variant="outline" data-color={color} size="xsmall">
                        {event.requestEvent.operationType ?? "N/A"}
                      </Tag>
                    );
                  })()}
                </Table.DataCell>
                <Table.DataCell>
                  <span className="text-ax-neutral-800">
                    {event.orgId || "N/A"}
                  </span>
                </Table.DataCell>
                <Table.DataCell>
                  <span className="text-ax-neutral-800">
                    {event.requestEvent?.resourceName || "N/A"}
                  </span>
                </Table.DataCell>
                <Table.DataCell>
                  <span className="text-ax-neutral-800">
                    {event.requestEvent?.created
                      ? new Date(event.requestEvent.created).toLocaleString(
                          "no-NO",
                        )
                      : "N/A"}
                  </span>
                </Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Box>
      {totalPages > 1 && (
        <Box paddingBlock="space-16">
          <Pagination
            page={currentPage}
            onPageChange={onPageChange}
            count={totalPages}
            size="small"
            boundaryCount={1}
            siblingCount={1}
            data-cy="pagination"
          />
        </Box>
      )}
    </Box>
  );
}
