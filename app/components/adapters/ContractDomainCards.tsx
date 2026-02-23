import {
  Detail,
  HGrid,
  HStack,
  InfoCard,
  Label,
  Tooltip,
} from "@navikt/ds-react";
import {
  CalendarIcon,
  CheckmarkCircleFillIcon,
  CheckmarkCircleIcon,
  ExclamationmarkTriangleFillIcon,
} from "@navikt/aksel-icons";
import type { IContractDomain } from "~/types";
import { formatDateRelative, formatTimestampDetailed } from "~/utils/time";
import { useMemo } from "react";

interface ContractDomainCardsProps {
  data: IContractDomain[];
  onCardClick: (item: IContractDomain) => void;
}

export function ContractDomainCards({
  data,
  onCardClick,
}: ContractDomainCardsProps) {
  // Sort so errors come first: hasContact false, then no syncs, then older syncs
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      // First priority: hasContact false comes first
      if (!a.hasContact && b.hasContact) return -1;
      if (a.hasContact && !b.hasContact) return 1;

      // Second priority: if both have same contact status, prioritize items with no syncs (0 or missing)
      const aHasNoSyncs =
        (!a.lastDeltaSync || a.lastDeltaSync === 0) &&
        (!a.lastFullSync || a.lastFullSync === 0);
      const bHasNoSyncs =
        (!b.lastDeltaSync || b.lastDeltaSync === 0) &&
        (!b.lastFullSync || b.lastFullSync === 0);
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

  function getStatusConfig(hasContact: boolean) {
    if (!hasContact) {
      return {
        icon: (
          <ExclamationmarkTriangleFillIcon
            aria-hidden
            className="text-ax-danger-700"
          />
        ),
        dataColor: "danger" as const,
      };
    } else {
      return {
        icon: (
          <CheckmarkCircleIcon aria-hidden className="text-ax-success-700" />
        ),
        dataColor: "success" as const,
      };
    }
  }

  return (
    <HGrid gap="space-16" columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      {sortedData.map((item, index) => {
        const { icon, dataColor } = getStatusConfig(item.hasContact);
        return (
          <InfoCard
            key={`${item.component}-${index}-${index}`}
            data-color={dataColor}
            onClick={() => onCardClick(item)}
          >
            <InfoCard.Header icon={icon}>
              <InfoCard.Title>
                Ressurs <Detail>{item.component}</Detail>
              </InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>
              <Label>Siste Delta</Label>
              <HStack gap="space-8" align="center">
                <Tooltip content={formatTimestampDetailed(item.lastDeltaSync)}>
                  <CalendarIcon title="a11y-title" fontSize="1.5rem" />
                </Tooltip>
                <Detail>{formatDateRelative(item.lastDeltaSync)}</Detail>
              </HStack>
              <Label>Siste Full</Label>
              <HStack gap="space-8" align="center">
                <Tooltip content={formatTimestampDetailed(item.lastFullSync)}>
                  <CalendarIcon title="a11y-title" fontSize="1.5rem" />
                </Tooltip>
                <Detail>{formatDateRelative(item.lastFullSync)}</Detail>
              </HStack>
              <hr />
              {item.answersEvents ? (
                <HStack gap="space-8" align="center" paddingBlock={"space-16"}>
                  <CheckmarkCircleFillIcon
                    color="var(--ax-bg-success-strong)"
                    title="Besvarer hendelser"
                    fontSize="1.25rem"
                  />
                  <Label>Besvarer hendelser</Label>
                </HStack>
              ) : (
                <HStack>
                  <ExclamationmarkTriangleFillIcon
                    color="var(--ax-bg-warning-strong)"
                    title="Besvarer ikke hendelser"
                    fontSize="1.25rem"
                  />
                  <Label>Besvarer ikke hendelser</Label>
                </HStack>
              )}
            </InfoCard.Content>
          </InfoCard>
        );
      })}
    </HGrid>
  );
}
