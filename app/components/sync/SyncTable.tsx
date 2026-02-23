import { Box, Pagination, Table, ProgressBar, Tag } from "@navikt/ds-react";
import {
  CheckmarkCircleFillIcon,
  ArrowCirclepathIcon,
} from "@navikt/aksel-icons";
import type { ISyncData } from "~/types";
import { useState, useMemo } from "react";

interface SyncTableProps {
  data: ISyncData[];
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onRowClick: (sync: ISyncData) => void;
}

export function SyncTable({
  data,
  currentPage,
  onPageChange,
  itemsPerPage,
  onRowClick,
}: SyncTableProps) {
  const [sort, setSort] = useState<
    { orderBy: string; direction: "ascending" | "descending" } | undefined
  >({ orderBy: "date", direction: "descending" });

  const sortedData = useMemo(() => {
    if (!sort) return data;

    return [...data].sort((a, b) => {
      if (sort.orderBy === "date") {
        const comparison = a.lastPageTime - b.lastPageTime;
        return sort.direction === "ascending" ? comparison : -comparison;
      }
      return 0;
    });
  }, [data, sort]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleSort = (sortKey: string) => {
    setSort((currentSort) => {
      if (!currentSort || currentSort.orderBy !== sortKey) {
        return { orderBy: sortKey, direction: "descending" };
      }
      if (currentSort.direction === "descending") {
        return { orderBy: sortKey, direction: "ascending" };
      }
      return undefined;
    });
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("no-NO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateProgress = (sync: ISyncData) => {
    return Math.round((sync.entitiesAquired / sync.totalEntities) * 100);
  };

  return (
    <Box
      padding="space-16"
      borderRadius="8"
      shadow="dialog"
      marginBlock={"space-16"}
    >
      <Table
        sort={sort}
        onSortChange={handleSort}
        size="small"
        zebraStripes={true}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Organisasjon</Table.HeaderCell>
            <Table.HeaderCell>Domene</Table.HeaderCell>
            <Table.HeaderCell>Pakke</Table.HeaderCell>
            <Table.HeaderCell>Ressurs</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Entiteter</Table.HeaderCell>
            <Table.HeaderCell>Sider</Table.HeaderCell>
            <Table.HeaderCell>Fremdrift</Table.HeaderCell>
            <Table.ColumnHeader sortKey="date" sortable>
              Sist oppdatert
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedData.map((sync, index) => (
            <Table.Row
              key={index}
              data-cy="sync-row"
              onRowClick={() => onRowClick(sync)}
              shadeOnHover={true}
            >
              <Table.DataCell>
                {sync.finished ? (
                  <CheckmarkCircleFillIcon
                    color="var(--ax-bg-success-strong)"
                    title="Fullført"
                    fontSize="1.25rem"
                  />
                ) : (
                  <ArrowCirclepathIcon
                    color="var(--ax-bg-warning-strong)"
                    title="Pågår"
                    fontSize="1.25rem"
                  />
                )}
              </Table.DataCell>
              <Table.DataCell>{sync.orgId}</Table.DataCell>
              <Table.DataCell>{sync.domain}</Table.DataCell>
              <Table.DataCell>{sync.package}</Table.DataCell>
              <Table.DataCell>{sync.resource}</Table.DataCell>
              <Table.DataCell>
                <Tag
                  variant="outline"
                  size="xsmall"
                  data-color={sync.syncType === "FULL" ? "info" : "meta-purple"}
                >
                  {sync.syncType}
                </Tag>
              </Table.DataCell>
              <Table.DataCell>
                {sync.entitiesAquired}/{sync.totalEntities}
              </Table.DataCell>
              <Table.DataCell>
                {sync.pagesAcquired}/{sync.totalPages}
              </Table.DataCell>
              <Table.DataCell align="right">
                <Box paddingBlock="space-0">
                  <ProgressBar
                    data-color={sync.finished ? "success" : "warning"}
                    value={calculateProgress(sync)}
                    size="small"
                    aria-label={`Fremdrift: ${calculateProgress(sync)}%`}
                  />
                  <Box>{calculateProgress(sync)}%</Box>
                </Box>
              </Table.DataCell>
              <Table.DataCell>{formatTime(sync.lastPageTime)}</Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {totalPages > 1 && (
        <Box
          paddingBlock="space-16"
          className="flex justify-center"
          data-cy="pagination"
        >
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
