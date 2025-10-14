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
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEventData | null>(null);

  const handleClearFilters = () => {
    setSearchFilter("");
    setDateRange(undefined);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowClick = (event: IEventData) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    fetchEventDetail(event.eventId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const [eventDetailData, setEventDetailData] = useState<IEventDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const fetchEventDetail = async (eventId: string) => {
    try {
      setLoadingDetail(true);
      const response = await EventsApi.getEventDetail(eventId);
      setEventDetailData(response.data || null);
    } catch {
      setEventDetailData(null);
    } finally {
      setLoadingDetail(false);
    }
  };

  const filteredData = initialData.filter((event) => {
    if (searchFilter) {
      const searchTerm = searchFilter.toLowerCase();
      const matchesId = event.eventId.toLowerCase().includes(searchTerm);
      const matchesResources = event.resources.toLowerCase().includes(searchTerm);

      if (!matchesId && !matchesResources) {
        return false;
      }
    }

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
