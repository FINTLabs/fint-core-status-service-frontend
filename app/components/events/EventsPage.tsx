import { useState } from "react";
import { Box } from "@navikt/ds-react";
import { EventsFilter } from "./EventsFilter";
import { EventsModal } from "./EventsModal";
import { PageHeader } from "../layout/PageHeader";
import type { IEventData, IEventDetail } from "~/types";
import { EventsTable } from "./EventsTable";
import EventsApi from "~/routes/api/EventsApi";

interface FilterPageProps {
  initialData: IEventData[];
  env: string;
}

export function EventsPage({ initialData, env }: FilterPageProps) {
  // Filter states
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>(undefined);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEventData | null>(null);

  // Clear all filters
  const handleClearFilters = () => {
    setSearchFilter("");
    setDateRange(undefined);
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Modal handlers
  const handleRowClick = (event: IEventData) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    fetchEventDetail(event.eventId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Fetch event detail data from API
  const [eventDetailData, setEventDetailData] = useState<IEventDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const fetchEventDetail = async (eventId: string) => {
    try {
      setLoadingDetail(true);
      const response = await EventsApi.getEventDetail(eventId);
      setEventDetailData(response.data || null);
    } catch {
      // Handle error silently or use proper error logging
      // console.error("Failed to fetch event detail:", err);
      // Set null on error
      setEventDetailData(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  // Filter the data based on current filters
  const filteredData = initialData.filter((event) => {
    // Search filter - searches both ID and resources
    if (searchFilter) {
      const searchTerm = searchFilter.toLowerCase();
      const matchesId = event.eventId.toLowerCase().includes(searchTerm);
      const matchesResources = event.resources.toLowerCase().includes(searchTerm);

      if (!matchesId && !matchesResources) {
        return false;
      }
    }

    // Date range filter
    if (dateRange?.from || dateRange?.to) {
      const eventDate = new Date(event.transferred);

      if (dateRange.from && eventDate < dateRange.from) {
        return false;
      }

      if (dateRange.to && eventDate > dateRange.to) {
        return false;
      }
    }

    return true;
  });

  // Reset to page 1 when filter changes
  const handleSearchFilterChange = (value: string) => {
    setSearchFilter(value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (range: { from?: Date; to?: Date } | undefined) => {
    setDateRange(range);
    setCurrentPage(1);
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Hendelser", href: "/hendelser" },
  ];

  return (
    <Box padding="8" paddingBlock="2">
      <PageHeader
        title="Hendelser"
        description="Oversikt over hendelser og operasjoner i Fint Core systemet."
        env={env}
        breadcrumbItems={breadcrumbItems}
      />

      <EventsFilter
        searchFilter={searchFilter}
        dateRange={dateRange}
        onSearchFilterChange={handleSearchFilterChange}
        onDateRangeChange={handleDateRangeChange}
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

      {/* Modal */}
      {selectedEvent && eventDetailData && (
        <EventsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          requestData={eventDetailData.request}
          responseData={eventDetailData.response}
          hendelseId={selectedEvent.eventId}
        />
      )}
    </Box>
  );
}
