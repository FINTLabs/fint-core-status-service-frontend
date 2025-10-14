import { useState } from "react";
import { Box } from "@navikt/ds-react";
import { SyncFilter } from "./SyncFilter";
import { SyncTable } from "./SyncTable";
import { SyncModal } from "./SyncModal";
import { PageHeader } from "../layout/PageHeader";
import type { ISyncData } from "~/types";

interface SyncPageProps {
  initialData: ISyncData[];
  env: string;
}

export function SyncPage({ initialData, env }: SyncPageProps) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSync, setSelectedSync] = useState<ISyncData | null>(null);

  // Filter states
  const [syncTypeFilter, setSyncTypeFilter] = useState<{
    full: boolean;
    delta: boolean;
  }>({ full: true, delta: true });

  const [statusFilter, setStatusFilter] = useState<{
    finished: boolean;
    ongoing: boolean;
  }>({ finished: true, ongoing: true });

  const [organisasjonFilter, setOrganisasjonFilter] = useState<string>("");
  const [domeneFilter, setDomeneFilter] = useState<string>("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to page 1 when filters change
  const handleSyncTypeFilterChange = (value: { full: boolean; delta: boolean }) => {
    setSyncTypeFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: { finished: boolean; ongoing: boolean }) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleOrganisasjonFilterChange = (value: string) => {
    setOrganisasjonFilter(value);
    setCurrentPage(1);
  };

  const handleDomeneFilterChange = (value: string) => {
    setDomeneFilter(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSyncTypeFilter({ full: true, delta: true });
    setStatusFilter({ finished: true, ongoing: true });
    setOrganisasjonFilter("");
    setDomeneFilter("");
    setCurrentPage(1);
  };

  // Modal handlers
  const handleRowClick = (sync: ISyncData) => {
    setSelectedSync(sync);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSync(null);
  };

  // Filter the data based on current filters
  const filteredData = initialData.filter((sync) => {
    // Sync type filter
    if (!syncTypeFilter.full && sync.syncType === "FULL") {
      return false;
    }
    if (!syncTypeFilter.delta && sync.syncType === "DELTA") {
      return false;
    }

    // Status filter
    if (!statusFilter.finished && sync.finished) {
      return false;
    }
    if (!statusFilter.ongoing && !sync.finished) {
      return false;
    }

    // Organisation filter
    if (
      organisasjonFilter &&
      !sync.orgId.toLowerCase().includes(organisasjonFilter.toLowerCase())
    ) {
      return false;
    }

    // Domain filter
    return !(domeneFilter && !sync.domain.toLowerCase().includes(domeneFilter.toLowerCase()));
  });

  // Get unique values for select options
  const uniqueOrganisasjoner = [...new Set(initialData.map((item) => item.orgId))];
  const uniqueDomener = [...new Set(initialData.map((item) => item.domain))];

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Synkronisering", href: "/sync" },
  ];

  return (
    <Box padding="8" paddingBlock="2">
      <PageHeader
        title="Synkronisering"
        description="Oversikt over synkroniseringer og status i Fint Core systemet."
        env={env}
        breadcrumbItems={breadcrumbItems}
      />

      <SyncFilter
        syncTypeFilter={syncTypeFilter}
        statusFilter={statusFilter}
        organisasjonFilter={organisasjonFilter}
        domeneFilter={domeneFilter}
        uniqueOrganisasjoner={uniqueOrganisasjoner}
        uniqueDomener={uniqueDomener}
        onSyncTypeFilterChange={handleSyncTypeFilterChange}
        onStatusFilterChange={handleStatusFilterChange}
        onOrganisasjonFilterChange={handleOrganisasjonFilterChange}
        onDomeneFilterChange={handleDomeneFilterChange}
        onClearFilters={handleClearFilters}
      />

      <SyncTable
        data={filteredData}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onRowClick={handleRowClick}
      />

      {/* Modal */}
      {selectedSync && (
        <SyncModal isOpen={isModalOpen} onClose={handleCloseModal} syncData={selectedSync} />
      )}
    </Box>
  );
}
