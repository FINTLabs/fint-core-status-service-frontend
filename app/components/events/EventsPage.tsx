import { useEffect, useMemo, useState } from "react";
import { Box } from "@navikt/ds-react";
import { EventsFilter } from "./EventsFilter";
import { EventsModal } from "./EventsModal";

import { EventsTable } from "./EventsTable";
import type { IEvent } from "~/types/Event";

interface EventPageProps {
  initialData: IEvent[];
  env: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  onDateRangeChange: (value: {
    from: Date | undefined;
    to: Date | undefined;
  }) => void;
}

export function EventsPage({
  initialData,
  dateRange,
  onDateRangeChange,
}: EventPageProps) {
  const routeFromTimestamp = dateRange.from?.getTime();
  const routeToTimestamp = dateRange.to?.getTime();

  const [appliedFilters, setAppliedFilters] = useState({
    searchFilter: "",
    dateRange,
    operationFilter: {
      CREATE: true,
      UPDATE: true,
      DELETE: true,
      VALIDATE: true,
      UNKNOWN: true,
    },
    orgFilter: "",
    resourceFilter: "",
    statusFilter: { ok: true, error: true },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  useEffect(() => {
    setAppliedFilters((prev) => {
      const prevFromTimestamp = prev.dateRange.from?.getTime();
      const prevToTimestamp = prev.dateRange.to?.getTime();
      const hasDateRangeChange =
        prevFromTimestamp !== routeFromTimestamp ||
        prevToTimestamp !== routeToTimestamp;

      if (!hasDateRangeChange) {
        return prev;
      }

      return {
        ...prev,
        dateRange: {
          from: dateRange.from,
          to: dateRange.to,
        },
      };
    });
  }, [routeFromTimestamp, routeToTimestamp, dateRange.from, dateRange.to]);

  const handleApplyFilters = (value: typeof appliedFilters) => {
    setAppliedFilters(value);
    setCurrentPage(1);

    const currentFrom = appliedFilters.dateRange.from?.getTime();
    const currentTo = appliedFilters.dateRange.to?.getTime();
    const nextFrom = value.dateRange.from?.getTime();
    const nextTo = value.dateRange.to?.getTime();
    const hasDateChange = currentFrom !== nextFrom || currentTo !== nextTo;

    if (hasDateChange) {
      onDateRangeChange(value.dateRange);
    }
  };

  const handleSearchFilterChange = (value: string) => {
    setAppliedFilters((prev) => ({
      ...prev,
      searchFilter: value,
    }));
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: "all" | "ok" | "error") => {
    setAppliedFilters((prev) => ({
      ...prev,
      statusFilter:
        value === "all"
          ? { ok: true, error: true }
          : {
              ok: value === "ok",
              error: value === "error",
            },
    }));
    setCurrentPage(1);
  };

  const handleOperationFilterChange = (
    value: "all" | "CREATE" | "UPDATE" | "DELETE" | "VALIDATE" | "UNKNOWN",
  ) => {
    setAppliedFilters((prev) => ({
      ...prev,
      operationFilter:
        value === "all"
          ? {
              CREATE: true,
              UPDATE: true,
              DELETE: true,
              VALIDATE: true,
              UNKNOWN: true,
            }
          : {
              CREATE: value === "CREATE",
              UPDATE: value === "UPDATE",
              DELETE: value === "DELETE",
              VALIDATE: value === "VALIDATE",
              UNKNOWN: value === "UNKNOWN",
            },
    }));
    setCurrentPage(1);
  };

  const handleOrgFilterChange = (value: string) => {
    setAppliedFilters((prev) => ({
      ...prev,
      orgFilter: value,
    }));
    setCurrentPage(1);
  };

  const handleResourceFilterChange = (value: string) => {
    setAppliedFilters((prev) => ({
      ...prev,
      resourceFilter: value,
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (event: IEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    // fetchEventDetail(event.eventId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // const [eventDetailData, setEventDetailData] = useState<IEventDetail | null>(null);
  // const [loadingDetail, setLoadingDetail] = useState(false);

  // const fetchEventDetail = async (eventId: string) => {
  //   try {
  //     setLoadingDetail(true);
  //     const response = await EventsApi.getEventDetail(eventId);
  //     setEventDetailData(response.data || null);
  //   } catch {
  //     setEventDetailData(null);
  //   } finally {
  //     setLoadingDetail(false);
  //   }
  // };

  const filteredData = useMemo(() => {
    const filtered = initialData.filter((event) => {
      // Skip events without requestEvent
      if (!event.requestEvent) {
        return false;
      }

      // Search filter
      if (appliedFilters.searchFilter) {
        const searchTerm = appliedFilters.searchFilter.toLowerCase();
        const matchesCorrId = event.corrId?.toLowerCase().includes(searchTerm);
        const matchesOrgId = event.orgId?.toLowerCase().includes(searchTerm);
        const matchesResource = event.requestEvent.resourceName
          ?.toLowerCase()
          .includes(searchTerm);
        const matchesTopic = event.topic?.toLowerCase().includes(searchTerm);

        if (
          !matchesCorrId &&
          !matchesOrgId &&
          !matchesResource &&
          !matchesTopic
        ) {
          return false;
        }
      }

      const operationType = event.requestEvent.operationType
        ? event.requestEvent.operationType.toUpperCase()
        : "";
      if (
        !appliedFilters.operationFilter[
          operationType as keyof typeof appliedFilters.operationFilter
        ]
      ) {
        return false;
      }

      if (
        appliedFilters.orgFilter &&
        event.orgId !== appliedFilters.orgFilter
      ) {
        return false;
      }

      if (
        appliedFilters.resourceFilter &&
        event.requestEvent.resourceName !== appliedFilters.resourceFilter
      ) {
        return false;
      }

      if (!appliedFilters.statusFilter.ok && !event.hasError) {
        return false;
      }
      if (!appliedFilters.statusFilter.error && event.hasError) {
        return false;
      }

      // Date range filter
      if (appliedFilters.dateRange.from || appliedFilters.dateRange.to) {
        const eventDate = new Date(event.requestEvent.created);

        if (appliedFilters.dateRange.from && appliedFilters.dateRange.to) {
          const fromDate = new Date(appliedFilters.dateRange.from);
          const toDate = new Date(appliedFilters.dateRange.to);
          if (eventDate < fromDate || eventDate > toDate) {
            return false;
          }
        } else if (appliedFilters.dateRange.from) {
          const fromDate = new Date(appliedFilters.dateRange.from);
          if (eventDate < fromDate) {
            return false;
          }
        } else if (appliedFilters.dateRange.to) {
          const toDate = new Date(appliedFilters.dateRange.to);
          if (eventDate > toDate) {
            return false;
          }
        }
      }

      return true;
    });

    // Sort by date, newest first
    return [...filtered].sort((a, b) => {
      const aDate = a.requestEvent?.created || 0;
      const bDate = b.requestEvent?.created || 0;
      return bDate - aDate; // Descending order (newest first)
    });
  }, [initialData, appliedFilters]);

  const uniqueOrganisation = [
    ...new Set(
      initialData
        .map((event) => event.orgId)
        .filter((id): id is string => Boolean(id)),
    ),
  ].sort();
  const uniqueResource = [
    ...new Set(
      initialData
        .map((event) => event.requestEvent?.resourceName)
        .filter((name): name is string => Boolean(name)),
    ),
  ].sort();

  const loadingDetail = false;
  return (
    <Box padding="space-32" paddingBlock="space-8">
      <EventsFilter
        filters={appliedFilters}
        onApplyFilters={handleApplyFilters}
      />
      <EventsTable
        data={filteredData}
        onRowClick={handleRowClick}
        loading={loadingDetail}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        searchFilter={appliedFilters.searchFilter}
        onSearchFilterChange={handleSearchFilterChange}
        uniqueOrg={uniqueOrganisation}
        uniqueResource={uniqueResource}
        activeFilters={{
          status:
            appliedFilters.statusFilter.ok && appliedFilters.statusFilter.error
              ? "all"
              : appliedFilters.statusFilter.ok
                ? "ok"
                : appliedFilters.statusFilter.error
                  ? "error"
                  : "none",
          operation:
            appliedFilters.operationFilter.CREATE &&
            appliedFilters.operationFilter.UPDATE &&
            appliedFilters.operationFilter.DELETE &&
            appliedFilters.operationFilter.VALIDATE &&
            appliedFilters.operationFilter.UNKNOWN
              ? "all"
              : appliedFilters.operationFilter.CREATE
                ? "CREATE"
                : appliedFilters.operationFilter.UPDATE
                  ? "UPDATE"
                  : appliedFilters.operationFilter.DELETE
                    ? "DELETE"
                    : appliedFilters.operationFilter.VALIDATE
                      ? "VALIDATE"
                      : appliedFilters.operationFilter.UNKNOWN
                        ? "UNKNOWN"
                        : "none",
          org: appliedFilters.orgFilter,
          resource: appliedFilters.resourceFilter,
        }}
        onStatusFilterChange={handleStatusFilterChange}
        onOperationFilterChange={handleOperationFilterChange}
        onOrgFilterChange={handleOrgFilterChange}
        onResourceFilterChange={handleResourceFilterChange}
      />

      {selectedEvent && selectedEvent.requestEvent && (
        <EventsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          requestData={selectedEvent.requestEvent}
          responseData={selectedEvent.responseEvent}
        />
      )}
    </Box>
  );
}
