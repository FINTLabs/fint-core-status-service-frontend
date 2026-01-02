import { Box, Detail, HGrid, Label, VStack } from "@navikt/ds-react";
import {
  CheckmarkCircleIcon,
  ChevronRightIcon,
  ExclamationmarkTriangleIcon, HeartBrokenIcon,
  XMarkOctagonIcon
} from "@navikt/aksel-icons";
import type { IContractStatus } from "~/types";

interface AdapterCardsProps {
  data: IContractStatus[];
  onCardClick: (adapter: IContractStatus) => void;
}

export function AdapterCards({ data, onCardClick }: AdapterCardsProps) {
  return (
    <HGrid gap="4" columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
      {data.map((item, index) => (
        <Box
          key={item.organzation + item.domain + index}
          background={"surface-subtle" as const}
          padding="4"
          borderRadius="large"
          shadow="xsmall"
          className={`cursor-pointer transition-all hover:shadow-medium relative ${item.status === "HEALTHY" ? "border-l-4 border-l-green-500" : "border-l-4 border-l-red-500"}`}
          onClick={() => onCardClick(item)}
        >
          <ChevronRightIcon className="absolute top-4 right-4 text-gray-400" fontSize="1.25rem" aria-hidden="true" />
          <VStack gap="3">
            {/* Status indicator */}
            <Box className="flex items-center gap-2">
              {(() => {
                switch (item.status) {
                  case "HEALTHY":
                    return (
                      <>
                        <CheckmarkCircleIcon
                          className="text-green-600"
                          title="Aktiv"
                          fontSize="1.5rem"
                        />
                        <Label className="text-sm font-semibold text-green-700">
                          Aktiv
                        </Label>
                      </>
                    );
                  case "NOT_FOLLOWING_CONTRACT":
                    return (
                      <>
                        <XMarkOctagonIcon
                          className="text-red-600"
                          title="Inaktiv"
                          fontSize="1.5rem"
                        />
                        <Label className="text-sm font-semibold text-red-700">
                          Leverer ikke på komponent
                        </Label>
                      </>
                    );

                  case "NO_HEARTBEAT":
                    return (
                      <>
                        <HeartBrokenIcon
                          className="text-red-600"
                          title="Ingen drift puls"
                          fontSize="1.5rem"
                        />
                        <Label className="text-sm font-semibold text-red-700">
                          Ingen drift puls
                        </Label>
                      </>
                    );
                }
              })()}
            </Box>

            {/* Organization */}
            <Box>
              <span className="text-xs text-gray-600 uppercase tracking-wide">Organisasjon</span>
              <Detail weight="semibold">{item.organzation}</Detail>
            </Box>

            {/* Domain */}
            <Box>
              <span className="text-xs text-gray-600 uppercase tracking-wide">Domene</span>
              <Detail weight="semibold">{item.domain}</Detail>
            </Box>
          </VStack>
        </Box>
      ))}
    </HGrid>
  );
}
