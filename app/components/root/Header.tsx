import { Box, HStack, LinkPanel, VStack } from "@navikt/ds-react";
import { MENU_LINKS } from "~/constants/menu";
import { EnvSelector } from "~/constants/envSelector";

interface headerProps {
  onHeaderChange: (newEnv: string) => void;
  value: string;
}

export default function Header({ onHeaderChange, value }: headerProps) {
  return (
    <Box
      shadow="small"
      className="flex justify-center h-24"
      borderRadius="0 0 xlarge xlarge"
    >
      <VStack gap="6" justify="center" align="center">
        <HStack gap="4" className="max-w-fit">
          {MENU_LINKS.map((menuLink, index) => (
            <LinkPanel href={menuLink.href} key={index}>
              <LinkPanel.Title>{menuLink.name}</LinkPanel.Title>
            </LinkPanel>
          ))}
          <EnvSelector onChange={onHeaderChange} value={value} />
        </HStack>
      </VStack>
    </Box>
  );
}
