import { useState } from "react";
import { Box } from "@navikt/ds-react";
import { SyncFilter } from "./SyncFilter";
import { SyncTable } from "./SyncTable";
import { SyncModal } from "./SyncModal";
import type { ISyncData } from "~/types";

interface SyncPageProps {
  initialData: ISyncData[];
  env: string;
}

export function SyncPage({ initialData }: SyncPageProps) {
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
  const [pakkeFilter, setPakkeFilter] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });

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

  const handlePakkeFilterChange = (value: string) => {
    setPakkeFilter(value);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (value: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSyncTypeFilter({ full: true, delta: true });
    setStatusFilter({ finished: true, ongoing: true });
    setOrgFilter("");
    setDomainFilter("");
    setPakkeFilter("");
    setDateRange({ from: undefined, to: undefined });
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

    if (domainFilter && !sync.domain.toLowerCase().includes(domainFilter.toLowerCase())) {
      return false;
    }

    if (pakkeFilter && !sync.package.toLowerCase().includes(pakkeFilter.toLowerCase())) {
      return false;
    }

    // Date range filter
    if (dateRange.from || dateRange.to) {
      const syncDate = new Date(sync.lastPageTime);
      if (dateRange.from && dateRange.to) {
        // Set time to start of day for 'from' and end of day for 'to'
        const fromDate = new Date(dateRange.from);
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date(dateRange.to);
        toDate.setHours(23, 59, 59, 999);
        if (syncDate < fromDate || syncDate > toDate) {
          return false;
        }
      } else if (dateRange.from) {
        const fromDate = new Date(dateRange.from);
        fromDate.setHours(0, 0, 0, 0);
        if (syncDate < fromDate) {
          return false;
        }
      } else if (dateRange.to) {
        const toDate = new Date(dateRange.to);
        toDate.setHours(23, 59, 59, 999);
        if (syncDate > toDate) {
          return false;
        }
      }
    }

    return true;
  });

  const uniqueOrg = [...new Set(initialData.map((item) => item.orgId))];
  const uniqueDomain = [...new Set(initialData.map((item) => item.domain))];
  const uniquePakke = [...new Set(initialData.map((item) => item.package))];

  // const breadcrumbItems = [
  //   { label: "Dashboard", href: "/" },
  //   { label: "Synkronisering", href: "/sync" },
  // ];

  return (
    <Box padding="8" paddingBlock="2">
      {/*<PageHeader*/}
      {/*  title="Synkronisering"*/}
      {/*  description="Oversikt over synkroniseringer og status i Fint Core systemet."*/}
      {/*  env={env}*/}
      {/*  breadcrumbItems={breadcrumbItems}*/}
      {/*  icon={<ArrowsSquarepathIcon aria-hidden />}*/}
      {/*/>*/}

      <SyncFilter
        syncTypeFilter={syncTypeFilter}
        statusFilter={statusFilter}
        orgFilter={orgFilter}
        domainFilter={domainFilter}
        packageFilter={pakkeFilter}
        dateRange={dateRange}
        uniqueOrg={uniqueOrg}
        uniqueDomain={uniqueDomain}
        uniquePacker={uniquePakke}
        onSyncTypeFilterChange={handleSyncTypeFilterChange}
        onStatusFilterChange={handleStatusFilterChange}
        onOrgFilterChange={handleOrgFilterChange}
        onDomainFilterChange={handleDomainFilterChange}
        onPackageFilterChange={handlePakkeFilterChange}
        onDateRangeChange={handleDateRangeChange}
        onClearFilters={handleClearFilters}
      />

      <SyncTable data={filteredData} currentPage={currentPage} onPageChange={handlePageChange} itemsPerPage={itemsPerPage} onRowClick={handleRowClick} />

      {selectedSync && <SyncModal isOpen={isModalOpen} onClose={handleCloseModal} syncData={selectedSync} />}
    </Box>
  );
}
