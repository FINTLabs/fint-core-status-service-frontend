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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSync, setSelectedSync] = useState<ISyncData | null>(null);

  const [syncTypeFilter, setSyncTypeFilter] = useState<{
    full: boolean;
    delta: boolean;
  }>({ full: true, delta: true });

  const [statusFilter, setStatusFilter] = useState<{
    finished: boolean;
    ongoing: boolean;
  }>({ finished: true, ongoing: true });

  const [orgFilter, setOrgFilter] = useState<string>("");
  const [domainFilter, setDomainFilter] = useState<string>("");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSyncTypeFilterChange = (value: { full: boolean; delta: boolean }) => {
    setSyncTypeFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: { finished: boolean; ongoing: boolean }) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleOrgFilterChange = (value: string) => {
    setOrgFilter(value);
    setCurrentPage(1);
  };

  const handleDomainFilterChange = (value: string) => {
    setDomainFilter(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSyncTypeFilter({ full: true, delta: true });
    setStatusFilter({ finished: true, ongoing: true });
    setOrgFilter("");
    setDomainFilter("");
    setCurrentPage(1);
  };

  const handleRowClick = (sync: ISyncData) => {
    setSelectedSync(sync);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSync(null);
  };

  const filteredData = initialData.filter((sync) => {
    if (!syncTypeFilter.full && sync.syncType === "FULL") {
      return false;
    }
    if (!syncTypeFilter.delta && sync.syncType === "DELTA") {
      return false;
    }

    if (!statusFilter.finished && sync.finished) {
      return false;
    }
    if (!statusFilter.ongoing && !sync.finished) {
      return false;
    }

    if (orgFilter && !sync.orgId.toLowerCase().includes(orgFilter.toLowerCase())) {
      return false;
    }

    return !(domainFilter && !sync.domain.toLowerCase().includes(domainFilter.toLowerCase()));
  });

  const uniqueOrg = [...new Set(initialData.map((item) => item.orgId))];
  const uniqueDomain = [...new Set(initialData.map((item) => item.domain))];

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
        organisasjonFilter={orgFilter}
        domeneFilter={domainFilter}
        uniqueOrganisasjoner={uniqueOrg}
        uniqueDomener={uniqueDomain}
        onSyncTypeFilterChange={handleSyncTypeFilterChange}
        onStatusFilterChange={handleStatusFilterChange}
        onOrganisasjonFilterChange={handleOrgFilterChange}
        onDomeneFilterChange={handleDomainFilterChange}
        onClearFilters={handleClearFilters}
      />

      <SyncTable
        data={filteredData}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onRowClick={handleRowClick}
      />

      {selectedSync && (
        <SyncModal isOpen={isModalOpen} onClose={handleCloseModal} syncData={selectedSync} />
      )}
    </Box>
  );
}
