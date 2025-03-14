import {Box, Heading, HStack, VStack,} from "@navikt/ds-react";
import {ChangingRoomIcon} from "@navikt/aksel-icons";
import {SVGProps} from "react";


interface TitleProps {
  icon: React.RefAttributes<SVGSVGElement>;
  onIconClick?: () => void;
}

export default function Title({
                                icon,
                                onIconClick,
                              }: TitleProps) {
  return (
    <Box
      as="header"
      borderWidth="0 0 4 0"
      borderColor="border-success"
      paddingBlock="4 0"
    >
      <div className="max-w-5xl">
        <Box paddingInline="4" paddingBlock="0 6">
          <HStack align="start" gap="4">
            <div
              onClick={onIconClick}
              style={{cursor: onIconClick ? "pointer" : "default"}}
            >
              {icon}
            </div>
            <VStack gap={{xs: "4", md: "5"}}>
              <Heading level="1" size="xlarge">
                Konsumere
              </Heading>

            </VStack>
          </HStack>
        </Box>
      </div>
    </Box>
  );
};
