import { useEffect, useState } from "react";
import { Box } from "@navikt/ds-react";
import { SyncFilter } from "./SyncFilter";
import { SyncTable } from "./SyncTable";
import { SyncModal } from "./SyncModal";
import type { ISyncData } from "~/types";
import type { SyncFiltersState } from "~/types/Sync";
import { useSearchParams } from "react-router";

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

export function SyncPage({
  initialData,
  dateRange,
  onDateRangeChange,
}: SyncPageProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSync, setSelectedSync] = useState<ISyncData | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [appliedFilters, setAppliedFilters] = useState<SyncFiltersState>(() => {
    const getParam = (...keys: string[]) => {
      for (const key of keys) {
        const value = searchParams.get(key);
        if (value !== null) {
          return value;
        }
      }
      return null;
    };

    const syncTypeParam = getParam("syncFilter");
    const statusParam = getParam("statusFilter");

    const fromParam = getParam("from");
    const toParam = getParam("to");
    const fromTimestamp =
      fromParam && !Number.isNaN(Number(fromParam))
        ? Number(fromParam)
        : undefined;
    const toTimestamp =
      toParam && !Number.isNaN(Number(toParam)) ? Number(toParam) : undefined;

    return {
      syncTypeFilter:
        syncTypeParam === "FULL"
          ? { full: true, delta: false }
          : syncTypeParam === "DELTA"
            ? { full: false, delta: true }
            : { full: true, delta: true },
      statusFilter:
        statusParam === "finished"
          ? { finished: true, ongoing: false }
          : statusParam === "ongoing"
            ? { finished: false, ongoing: true }
            : { finished: true, ongoing: true },
      orgFilter: getParam("orgFilter") ?? "",
      domainFilter: getParam("domainFilter") ?? "",
      packageFilter: getParam("packageFilter") ?? "",
      resourceFilter: getParam("resourceFilter") ?? "",
      adapterIdFilter: getParam("adapterIdFilter") ?? "",
      dateRange: {
        from:
          typeof fromTimestamp === "number"
            ? new Date(fromTimestamp)
            : dateRange.from,
        to:
          typeof toTimestamp === "number"
            ? new Date(toTimestamp)
            : dateRange.to,
      },
    };
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

  const updateSearchParams = (updates: Record<string, string | undefined>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      for (const [key, value] of Object.entries(updates)) {
        if (!value || value.trim() === "" || value === "all") {
          next.delete(key);
        } else {
          next.set(key, value);
        }
      }

      return next;
    });
  };

  const handleStatusFilterChange = (value: "all" | "finished" | "ongoing") => {
    setAppliedFilters((prev) => ({
      ...prev,
      statusFilter:
        value === "all"
          ? { finished: true, ongoing: true }
          : {
              finished: value === "finished",
              ongoing: value === "ongoing",
            },
    }));

    updateSearchParams({
      statusFilter: value === "all" ? undefined : value,
    });
    setCurrentPage(1);
  };

  const handleSyncTypeFilterChange = (value: "all" | "FULL" | "DELTA") => {
    setAppliedFilters((prev) => ({
      ...prev,
      syncTypeFilter:
        value === "all"
          ? { full: true, delta: true }
          : {
              full: value === "FULL",
              delta: value === "DELTA",
            },
    }));
    updateSearchParams({
      syncFilter: value === "all" ? undefined : value,
    });
    setCurrentPage(1);
  };

  const handleHeaderTextFilterChange = (
    key: "orgFilter" | "domainFilter" | "packageFilter" | "resourceFilter",
    value: string,
  ) => {
    setAppliedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    updateSearchParams({
      [key]: value,
    });
    setCurrentPage(1);
  };

  const handleAdapterIdFilterChange = (value: string) => {
    setAppliedFilters((prev) => ({
      ...prev,
      adapterIdFilter: value,
    }));
    setCurrentPage(1);
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

    if (
      appliedFilters.adapterIdFilter &&
      !sync.adapterId
        .toLowerCase()
        .includes(appliedFilters.adapterIdFilter.toLowerCase())
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
  const tableUniqueDomain = [
    ...new Set(initialData.map((item) => item.domain)),
  ];
  const tableUniquePackage = [
    ...new Set(initialData.map((item) => item.package)),
  ];
  const tableUniqueResource = [
    ...new Set(initialData.map((item) => item.resource)),
  ].sort((a, b) => a.localeCompare(b));

  return (
    <Box>
      <SyncFilter
        filters={appliedFilters}
        onApplyFilters={handleApplyFilters}
      />
      <SyncTable
        data={filteredData}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onRowClick={handleRowClick}
        activeFilters={{
          status:
            appliedFilters.statusFilter.finished &&
            appliedFilters.statusFilter.ongoing
              ? "all"
              : appliedFilters.statusFilter.finished
                ? "finished"
                : appliedFilters.statusFilter.ongoing
                  ? "ongoing"
                  : "none",
          syncType:
            appliedFilters.syncTypeFilter.full &&
            appliedFilters.syncTypeFilter.delta
              ? "all"
              : appliedFilters.syncTypeFilter.full
                ? "FULL"
                : appliedFilters.syncTypeFilter.delta
                  ? "DELTA"
                  : "none",
          org: appliedFilters.orgFilter,
          domain: appliedFilters.domainFilter,
          package: appliedFilters.packageFilter,
          resource: appliedFilters.resourceFilter,
        }}
        uniqueOrg={uniqueOrg}
        uniqueDomain={tableUniqueDomain}
        uniquePackage={tableUniquePackage}
        uniqueResource={tableUniqueResource}
        onStatusFilterChange={handleStatusFilterChange}
        onSyncTypeFilterChange={handleSyncTypeFilterChange}
        onOrgFilterChange={(value) =>
          handleHeaderTextFilterChange("orgFilter", value)
        }
        onDomainFilterChange={(value) =>
          handleHeaderTextFilterChange("domainFilter", value)
        }
        onPackageFilterChange={(value) =>
          handleHeaderTextFilterChange("packageFilter", value)
        }
        onResourceFilterChange={(value) =>
          handleHeaderTextFilterChange("resourceFilter", value)
        }
        adapterIdFilter={appliedFilters.adapterIdFilter}
        onAdapterIdFilterChange={handleAdapterIdFilterChange}
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
