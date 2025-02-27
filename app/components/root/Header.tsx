import {Box, HStack, LinkPanel} from "@navikt/ds-react";
import HeaderElement from "~/components/header/HeaderElement";
import {MENU_LINKS} from "~/constants/menu";
import {EnvSelector} from "~/constants/envSelector";

interface headerProps {
  onHeaderChange: (newEnv: string) => void;
  value: string;
}

export default function Header({onHeaderChange, value}: headerProps) {
  return (
    <Box
      as="header"
      className="flex justify-center h-16 w-full bg-header"
    >
      <HStack className="w-2/3 h-full flex justify-between">
        <HeaderElement>
          Kult navn
        </HeaderElement>
        <HeaderElement>
          {MENU_LINKS.map((menuLink, index) => (
            <LinkPanel href={menuLink.href} key={index}>
              <LinkPanel.Title>{menuLink.name}</LinkPanel.Title>
            </LinkPanel>
          ))}
        </HeaderElement>
        <HeaderElement>
          <EnvSelector onChange={onHeaderChange} value={value}/>
        </HeaderElement>
      </HStack>
    </Box>
  );
}
