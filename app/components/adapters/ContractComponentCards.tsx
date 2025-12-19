import { Box, HGrid, Tooltip, VStack } from "@navikt/ds-react";
import { CalendarIcon, HeartBrokenIcon, HeartIcon } from "@navikt/aksel-icons";
import { formatTimestampDetailed, formatDateRelative } from "~/utils/time";
import type { IContractComponent } from "~/types";
import { useMemo } from "react";

interface ContractComponentCardsProps {
  data: IContractComponent[];
}

export function ContractComponentCards({ data }: ContractComponentCardsProps) {
  // Sort so errors come first: heartbeat false, then lastDelta/lastFull being 0 or very old
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      // First priority: heartbeat false comes first
      if (!a.heartbeat && b.heartbeat) return -1;
      if (a.heartbeat && !b.heartbeat) return 1;

      // Second priority: if both have same heartbeat status, prioritize items with no syncs (0 or missing)
      const aHasNoSyncs = (!a.lastDelta || a.lastDelta === 0) && (!a.lastFull || a.lastFull === 0);
      const bHasNoSyncs = (!b.lastDelta || b.lastDelta === 0) && (!b.lastFull || b.lastFull === 0);
      if (aHasNoSyncs && !bHasNoSyncs) return -1;
      if (!aHasNoSyncs && bHasNoSyncs) return 1;

      // Third priority: older syncs come first (more likely to be problematic)
      const aLatestSync = Math.max(a.lastDelta || 0, a.lastFull || 0);
      const bLatestSync = Math.max(b.lastDelta || 0, b.lastFull || 0);
      if (aLatestSync === 0 && bLatestSync > 0) return -1;
      if (aLatestSync > 0 && bLatestSync === 0) return 1;
      if (aLatestSync > 0 && bLatestSync > 0) {
        return aLatestSync - bLatestSync; // Older syncs first
      }

      return 0;
    });
  }, [data]);

  if (sortedData.length === 0) {
    return (
      <Box background="surface-subtle" padding="space-16" borderRadius="large" shadow="xsmall">
        <Box className="text-center text-gray-500">Ingen ressurser funnet</Box>
      </Box>
    );
  }

  return (
    <HGrid gap="4" columns={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
      {sortedData.map((item, index) => {
        const hasError = !item.heartbeat || ((!item.lastDelta || item.lastDelta === 0) && (!item.lastFull || item.lastFull === 0));

        return (
          <Box
            key={`${item.adapterId}-${index}`}
            background="surface-default"
            padding="4"
            borderRadius="large"
            shadow="xsmall"
            className={`transition-all hover:shadow-medium ${hasError ? "border-l-4 border-l-red-500" : "border-l-4 border-l-green-500"}`}
            data-cy="adapter-component-detail-card"
          >
            <VStack gap="3">
              {/* Heartbeat status */}
              <Box className="flex items-center gap-2">
                {item.heartbeat ? (
                  <>
                    <HeartIcon className="text-green-600" title="Aktiv" fontSize="1.5rem" />
                    <span className="text-sm font-semibold text-green-700">Aktiv</span>
                  </>
                ) : (
                  <>
                    <HeartBrokenIcon className="text-red-600" title="Inaktiv" fontSize="1.5rem" />
                    <span className="text-sm font-semibold text-red-700">Inaktiv</span>
                  </>
                )}
              </Box>

              {/* Adapter ID */}
              <Box>
                <span className="text-xs text-gray-600 uppercase tracking-wide">Adapter ID</span>
                <p className="text-base font-medium mt-1 break-words">{item.adapterId}</p>
              </Box>

              {/* Last Delta Sync */}
              <Box>
                <span className="text-xs text-gray-600 uppercase tracking-wide">Siste Delta</span>
                {item.lastDelta && item.lastDelta !== 0 ? (
                  <Box className="flex items-center gap-2 mt-1">
                    <p className="text-base">{formatDateRelative(item.lastDelta)}</p>
                    <Tooltip content={formatTimestampDetailed(item.lastDelta)}>
                      <CalendarIcon title="a11y-title" fontSize="1.5rem" className="text-gray-500" />
                    </Tooltip>
                  </Box>
                ) : (
                  <p className="text-base text-gray-500 mt-1">-</p>
                )}
              </Box>

              {/* Last Full Sync */}
              <Box>
                <span className="text-xs text-gray-600 uppercase tracking-wide">Siste Full</span>
                {item.lastFull && item.lastFull !== 0 ? (
                  <Box className="flex items-center gap-2 mt-1">
                    <p className="text-base">{formatDateRelative(item.lastFull)}</p>
                    <Tooltip content={formatTimestampDetailed(item.lastFull)}>
                      <CalendarIcon title="a11y-title" fontSize="1.5rem" className="text-gray-500" />
                    </Tooltip>
                  </Box>
                ) : (
                  <p className="text-base text-gray-500 mt-1">-</p>
                )}
              </Box>
            </VStack>
          </Box>
        );
      })}
    </HGrid>
  );
}
