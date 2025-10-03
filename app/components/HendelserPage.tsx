import { useState } from "react";
import { Heading, BodyLong, Box } from "@navikt/ds-react";
import { HendelserFilter } from "./HendelserFilter";
import { HendelserModal } from "./HendelserModal";
import type { HendelserData } from "../types";
import { HendelserTable } from "./HendelserTable";
import HendelserApi from "~/routes/api/HendelserApi";

interface HendelserPageProps {
  initialData: HendelserData[];
  env: string;
}

export function HendelserPage({ initialData, env }: HendelserPageProps) {
  // Filter states
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [dateRange, setDateRange] = useState<
    { from?: Date; to?: Date } | undefined
  >(undefined);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHendelse, setSelectedHendelse] =
    useState<HendelserData | null>(null);

  // Clear all filters
  const handleClearFilters = () => {
    setSearchFilter("");
    setDateRange(undefined);
  };

  // Modal handlers
  const handleRowClick = (hendelse: HendelserData) => {
    setSelectedHendelse(hendelse);
    setIsModalOpen(true);
    fetchHendelseDetail(hendelse.hendelseId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHendelse(null);
  };

  // Fetch hendelse detail data from API
  const [hendelseDetailData, setHendelseDetailData] = useState<{
    request: any;
    response: any;
  } | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const fetchHendelseDetail = async (hendelseId: string) => {
    try {
      setLoadingDetail(true);
      const response = await HendelserApi.getHendelseDetail(hendelseId);
      setHendelseDetailData(response.data || null);
    } catch (err) {
      console.error("Failed to fetch hendelse detail:", err);
      // Set empty data on error
      setHendelseDetailData({
        request: null,
        response: null,
      });
    } finally {
      setLoadingDetail(false);
    }
  };


  // Filter the data based on current filters
  const filteredData = initialData.filter((hendelse) => {
    // Search filter - searches both ID and resources
    if (searchFilter) {
      const searchTerm = searchFilter.toLowerCase();
      const matchesId = hendelse.hendelseId.toLowerCase().includes(searchTerm);
      const matchesRessurser = hendelse.ressurser
        .toLowerCase()
        .includes(searchTerm);

      if (!matchesId && !matchesRessurser) {
        return false;
      }
    }

    // Date range filter
    if (dateRange?.from || dateRange?.to) {
      const hendelseDate = new Date(hendelse.overført);

      if (dateRange.from && hendelseDate < dateRange.from) {
        return false;
      }

      if (dateRange.to && hendelseDate > dateRange.to) {
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

      <HendelserTable
        data={filteredData}
        onRowClick={handleRowClick}
      />

      {/* Modal */}
      {selectedHendelse && hendelseDetailData && (
        <HendelserModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          requestData={hendelseDetailData.request}
          responseData={hendelseDetailData.response}
          hendelseId={selectedHendelse.hendelseId}
        />
      )}
    </Box>
  );
}
