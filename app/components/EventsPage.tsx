import { useState } from "react";
import { Heading, BodyLong, Box } from "@navikt/ds-react";
import { HendelserFilter } from "./HendelserFilter";
import { HendelserModal } from "./HendelserModal";
import type { IEventData, IEventDetail } from "~/types";
import { HendelserTable } from "./HendelserTable";
import EventsApi from "~/routes/api/HendelserApi";

interface HendelserPageProps {
  initialData: IEventData[];
  env: string;
}

export function EventsPage({ initialData, env }: HendelserPageProps) {
  // Filter states
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>(undefined);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEventData | null>(null);

  // Clear all filters
  const handleClearFilters = () => {
    setSearchFilter("");
    setDateRange(undefined);
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

  return (
    <Box padding="8" paddingBlock="2">
      <Box marginBlock="8">
        <Heading size="xlarge" spacing>
          Hendelser : {env}
        </Heading>
        <BodyLong size="large" textColor="subtle">
          Oversikt over hendelser og operasjoner i Fint Core systemet.
        </BodyLong>
      </Box>

      <HendelserFilter
        searchFilter={searchFilter}
        dateRange={dateRange}
        onSearchFilterChange={setSearchFilter}
        onDateRangeChange={setDateRange}
        onClearFilters={handleClearFilters}
      />

      <HendelserTable data={filteredData} onRowClick={handleRowClick} loading={loadingDetail} />

      {/* Modal */}
      {selectedEvent && eventDetailData && (
        <HendelserModal
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
