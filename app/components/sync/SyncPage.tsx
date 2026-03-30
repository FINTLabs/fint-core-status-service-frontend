import { useEffect, useState } from "react";
import { Box } from "@navikt/ds-react";
import { SyncFilter } from "./SyncFilter";
import { SyncTable } from "./SyncTable";
import { SyncModal } from "./SyncModal";
import type { ISyncData } from "~/types";

interface SyncPageProps {
  initialData: ISyncData[];
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

interface SyncFiltersState {
  syncTypeFilter: {
    full: boolean;
    delta: boolean;
  };
  statusFilter: {
    finished: boolean;
    ongoing: boolean;
  };
  orgFilter: string;
  domainFilter: string;
  packageFilter: string;
  resourceFilter: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export function SyncPage({
  initialData,
  dateRange,
  onDateRangeChange,
}: SyncPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSync, setSelectedSync] = useState<ISyncData | null>(null);

  const [appliedFilters, setAppliedFilters] = useState<SyncFiltersState>({
    syncTypeFilter: { full: true, delta: true },
    statusFilter: { finished: true, ongoing: true },
    orgFilter: "",
    domainFilter: "",
    packageFilter: "",
    resourceFilter: "",
    dateRange,
  });

  useEffect(() => {
    setAppliedFilters((prev) => ({
      ...prev,
      dateRange,
    }));
  }, [dateRange]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleApplyFilters = (value: SyncFiltersState) => {
    setAppliedFilters(value);
    setCurrentPage(1);

    const currentFrom = dateRange.from?.getTime();
    const currentTo = dateRange.to?.getTime();
    const nextFrom = value.dateRange.from?.getTime();
    const nextTo = value.dateRange.to?.getTime();
    const hasDateChange = currentFrom !== nextFrom || currentTo !== nextTo;

    if (hasDateChange) {
      onDateRangeChange(value.dateRange);
    }
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
    if (!appliedFilters.syncTypeFilter.full && sync.syncType === "FULL") {
      return false;
    }
    if (!appliedFilters.syncTypeFilter.delta && sync.syncType === "DELTA") {
      return false;
    }

    if (!appliedFilters.statusFilter.finished && sync.finished) {
      return false;
    }
    if (!appliedFilters.statusFilter.ongoing && !sync.finished) {
      return false;
    }

    if (
      appliedFilters.orgFilter &&
      !sync.orgId.toLowerCase().includes(appliedFilters.orgFilter.toLowerCase())
    ) {
      return false;
    }

    if (
      appliedFilters.domainFilter &&
      !sync.domain
        .toLowerCase()
        .includes(appliedFilters.domainFilter.toLowerCase())
    ) {
      return false;
    }

    if (
      appliedFilters.packageFilter &&
      !sync.package
        .toLowerCase()
        .includes(appliedFilters.packageFilter.toLowerCase())
    ) {
      return false;
    }

    if (
      appliedFilters.resourceFilter &&
      !sync.resource
        .toLowerCase()
        .includes(appliedFilters.resourceFilter.toLowerCase())
    ) {
      return false;
    }

    // Date range filter
    if (appliedFilters.dateRange.from || appliedFilters.dateRange.to) {
      const syncDate = new Date(sync.lastPageTime);
      if (appliedFilters.dateRange.from && appliedFilters.dateRange.to) {
        const fromDate = new Date(appliedFilters.dateRange.from);
        const toDate = new Date(appliedFilters.dateRange.to);
        if (syncDate < fromDate || syncDate > toDate) {
          return false;
        }
      } else if (appliedFilters.dateRange.from) {
        const fromDate = new Date(appliedFilters.dateRange.from);
        if (syncDate < fromDate) {
          return false;
        }
      } else if (appliedFilters.dateRange.to) {
        const toDate = new Date(appliedFilters.dateRange.to);
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
  const uniqueResource = [
    ...new Set(initialData.map((item) => item.resource)),
  ].sort((a, b) => a.localeCompare(b));

  function handleClearFilters() {
    setAppliedFilters({
      syncTypeFilter: { full: true, delta: true },
      statusFilter: { finished: true, ongoing: true },
      orgFilter: "",
      domainFilter: "",
      packageFilter: "",
      resourceFilter: "",
      dateRange: { from: undefined, to: undefined },
    });
    onDateRangeChange({ from: undefined, to: undefined });
    setCurrentPage(1);
  }

  return (
    <Box>
      <SyncFilter
        filters={appliedFilters}
        uniqueOrg={uniqueOrg}
        uniqueDomain={uniqueDomain}
        uniquePacker={uniquePakke}
        uniqueResource={uniqueResource}
        onApplyFilters={handleApplyFilters}
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
        <SyncModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          syncData={selectedSync}
        />
      )}
    </Box>
  );
}
