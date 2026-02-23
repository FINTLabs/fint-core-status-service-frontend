import { useMemo, useState } from "react";
import { Box } from "@navikt/ds-react";
import { EventsFilter } from "./EventsFilter";
import { EventsModal } from "./EventsModal";

import { EventsTable } from "./EventsTable";
import type { IEvent } from "~/types/Event";

interface EventPageProps {
  initialData: IEvent[];
  env: string;
}

export function EventsPage({ initialData }: EventPageProps) {
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [dateRange, setDateRange] = useState<
    { from?: Date; to?: Date } | undefined
  >(undefined);
  const [operationFilter, setOperationFilter] = useState<{
    CREATE: boolean;
    UPDATE: boolean;
    DELETE: boolean;
    VALIDATE: boolean;
  }>({ CREATE: true, UPDATE: true, DELETE: true, VALIDATE: true });
  const [organisasjonFilter, setOrganisasjonFilter] = useState<string>("");
  const [ressursFilter, setRessursFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<{
    ok: boolean;
    error: boolean;
  }>({ ok: true, error: true });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const handleClearFilters = () => {
    setSearchFilter("");
    setDateRange(undefined);
    setOperationFilter({
      CREATE: true,
      UPDATE: true,
      DELETE: true,
      VALIDATE: true,
    });
    setOrganisasjonFilter("");
    setRessursFilter("");
    setStatusFilter({ ok: true, error: true });
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
      if (searchFilter) {
        const searchTerm = searchFilter.toLowerCase();
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

      // Operation filter
      const operationType = event.requestEvent.operationType
        ? event.requestEvent.operationType.toUpperCase()
        : "";
      if (!operationFilter[operationType as keyof typeof operationFilter]) {
        return false;
      }

      // Organisation filter
      if (organisasjonFilter && event.orgId !== organisasjonFilter) {
        return false;
      }

      // Resource filter
      if (ressursFilter && event.requestEvent.resourceName !== ressursFilter) {
        return false;
      }

      // Status filter
      if (!statusFilter.ok && !event.hasError) {
        return false;
      }
      if (!statusFilter.error && event.hasError) {
        return false;
      }

      // Date range filter
      if (dateRange?.from || dateRange?.to) {
        const eventDate = new Date(event.requestEvent.created);

        if (dateRange.from && dateRange.to) {
          const fromDate = new Date(dateRange.from);
          fromDate.setHours(0, 0, 0, 0);
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
          if (eventDate < fromDate || eventDate > toDate) {
            return false;
          }
        } else if (dateRange.from) {
          const fromDate = new Date(dateRange.from);
          fromDate.setHours(0, 0, 0, 0);
          if (eventDate < fromDate) {
            return false;
          }
        } else if (dateRange.to) {
          const toDate = new Date(dateRange.to);
          toDate.setHours(23, 59, 59, 999);
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
  }, [
    initialData,
    searchFilter,
    operationFilter,
    organisasjonFilter,
    ressursFilter,
    statusFilter,
    dateRange,
  ]);

  const handleSearchFilterChange = (value: string) => {
    setSearchFilter(value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (
    range: { from?: Date; to?: Date } | undefined,
  ) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  const handleOperationFilterChange = (value: {
    CREATE: boolean;
    UPDATE: boolean;
    DELETE: boolean;
    VALIDATE: boolean;
  }) => {
    setOperationFilter(value);
    setCurrentPage(1);
  };

  const handleOrganisasjonFilterChange = (value: string) => {
    setOrganisasjonFilter(value);
    setCurrentPage(1);
  };

  const handleRessursFilterChange = (value: string) => {
    setRessursFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: { ok: boolean; error: boolean }) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // Extract unique values for filters
  const uniqueOrganisasjoner = [
    ...new Set(
      initialData
        .map((event) => event.orgId)
        .filter((id): id is string => Boolean(id)),
    ),
  ].sort();
  const uniqueRessurser = [
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
        searchFilter={searchFilter}
        dateRange={dateRange}
        operationFilter={operationFilter}
        orgFilter={organisasjonFilter}
        resourceFilter={ressursFilter}
        statusFilter={statusFilter}
        uniqueOrg={uniqueOrganisasjoner}
        uniqueResource={uniqueRessurser}
        onSearchFilterChange={handleSearchFilterChange}
        onDateRangeChange={handleDateRangeChange}
        onOperationFilterChange={handleOperationFilterChange}
        onOrgFilterChange={handleOrganisasjonFilterChange}
        onResourceFilterChange={handleRessursFilterChange}
        onStatusFilterChange={handleStatusFilterChange}
        onClearFilters={handleClearFilters}
      />
      <EventsTable
        data={filteredData}
        onRowClick={handleRowClick}
        loading={loadingDetail}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
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
