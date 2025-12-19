import { Box, Detail, HGrid, Label, Tooltip, VStack } from "@navikt/ds-react";
import { ArrowsSquarepathIcon, CalendarIcon, CheckmarkCircleFillIcon, ChevronRightIcon, LinkBrokenIcon, XMarkIcon } from "@navikt/aksel-icons";
import type { IContractDomain } from "~/types";
import { formatTimestampDetailed, formatDateRelative } from "~/utils/time";
import { useMemo } from "react";

interface ContractDomainCardsProps {
  data: IContractDomain[];
  onCardClick: (item: IContractDomain) => void;
}

export function ContractDomainCards({ data, onCardClick }: ContractDomainCardsProps) {
  // Sort so errors come first: hasContact false, then no syncs, then older syncs
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      // First priority: hasContact false comes first
      if (!a.hasContact && b.hasContact) return -1;
      if (a.hasContact && !b.hasContact) return 1;

      // Second priority: if both have same contact status, prioritize items with no syncs (0 or missing)
      const aHasNoSyncs = (!a.lastDeltaSync || a.lastDeltaSync === 0) && (!a.lastFullSync || a.lastFullSync === 0);
      const bHasNoSyncs = (!b.lastDeltaSync || b.lastDeltaSync === 0) && (!b.lastFullSync || b.lastFullSync === 0);
      if (aHasNoSyncs && !bHasNoSyncs) return -1;
      if (!aHasNoSyncs && bHasNoSyncs) return 1;

      // Third priority: older syncs come first (more likely to be problematic)
      const aLatestSync = Math.max(a.lastDeltaSync || 0, a.lastFullSync || 0);
      const bLatestSync = Math.max(b.lastDeltaSync || 0, b.lastFullSync || 0);
      if (aLatestSync === 0 && bLatestSync > 0) return -1;
      if (aLatestSync > 0 && bLatestSync === 0) return 1;
      if (aLatestSync > 0 && bLatestSync > 0) {
        return aLatestSync - bLatestSync; // Older syncs first
      }

      return 0;
    });
  }, [data]);

  return (
    <HGrid gap="4" columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      {sortedData.map((item, index) => {
        return (
          <Box
            key={`${item.component}-${index}`}
            background={"surface-subtle" as const}
            padding="4"
            borderRadius="large"
            shadow="xsmall"
            className={`cursor-pointer transition-all hover:shadow-medium relative ${item.hasContact ? "border-l-4 border-l-green-500" : "border-l-4 border-l-red-500"}`}
            onClick={() => onCardClick(item)}
            data-cy="adapter-detail-card"
          >
            <ChevronRightIcon className="absolute top-4 right-4 text-gray-400" fontSize="1.25rem" aria-hidden="true" />
            <VStack gap="3">
              {/* Heartbeat status */}
              <Box className="flex items-center gap-2">
                {item.hasContact ? (
                  <>
                    <ArrowsSquarepathIcon className="text-green-600" title="Aktiv" fontSize="1.5rem" />
                    <Label className="text-sm font-semibold text-green-700">Har kontakt</Label>
                  </>
                ) : (
                  <>
                    <LinkBrokenIcon className="text-red-600" title="Inaktiv" fontSize="1.5rem" />
                    <Label className="text-sm font-semibold text-red-700">Inaktiv</Label>
                  </>
                )}
              </Box>

              {/* Component name */}
              <Box>
                <span className="text-xs text-gray-600 uppercase tracking-wide">Ressurs</span>
                <p className="text-base font-medium break-words">{item.component}</p>
              </Box>

              {/* Last Delta Sync */}
              <Box>
                <span className="text-xs text-gray-600 uppercase tracking-wide">Siste Delta</span>
                {item.lastDeltaSync && item.lastDeltaSync !== 0 ? (
                  <Box className="flex items-center gap-2">
                    <p className="text-base">{formatDateRelative(item.lastDeltaSync)}</p>
                    <Tooltip content={formatTimestampDetailed(item.lastDeltaSync)}>
                      <CalendarIcon title="a11y-title" fontSize="1.5rem" className="text-gray-500" />
                    </Tooltip>
                  </Box>
                ) : (
                  <p className="text-base text-gray-500 ">-</p>
                )}
              </Box>

              {/* Last Full Sync */}
              <Box>
                <span className="text-xs text-gray-600 uppercase tracking-wide">Siste Full</span>
                {item.lastFullSync && item.lastFullSync !== 0 ? (
                  <Box className="flex items-center gap-2">
                    <Detail>{formatDateRelative(item.lastFullSync)}</Detail>
                    <Tooltip content={formatTimestampDetailed(item.lastFullSync)}>
                      <CalendarIcon title="a11y-title" fontSize="1.5rem" className="text-gray-500" />
                    </Tooltip>
                  </Box>
                ) : (
                  <Detail className="text-base text-gray-500">-</Detail>
                )}
              </Box>

              {/* Answers Events */}
              <Box className="flex items-center gap-2">
                {item.answersEvents ? (
                  <>
                    <CheckmarkCircleFillIcon className="text-green-600" title="Besvarer hendelser" fontSize="1.25rem" />
                    <span className="text-sm text-green-700">Besvarer hendelser</span>
                  </>
                ) : (
                  <>
                    <XMarkIcon className="text-red-600" title="Besvarer ikke hendelser" fontSize="1.25rem" />
                    <span className="text-sm text-red-700">Besvarer ikke hendelser</span>
                  </>
                )}
              </Box>
            </VStack>
          </Box>
        );
      })}
    </HGrid>
  );
}
