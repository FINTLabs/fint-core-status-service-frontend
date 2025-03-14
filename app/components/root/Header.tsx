import { Box, Dropdown, HStack, LinkPanel } from "@navikt/ds-react";
import HeaderElement from "~/components/header/HeaderElement";
import { MENU_LINKS } from "~/constants/menu";
import { EnvSelector } from "~/constants/envSelector";

interface headerProps {
  onHeaderChange: (newEnv: string) => void;
  value: string;
}

export default function Header({ onHeaderChange, value }: headerProps) {
  return (
    <Box as="header" className="flex justify-center h-16 w-full ">
      <HStack className="w-2/3 h-full flex justify-between">
        <HeaderElement>Kult navn</HeaderElement>
        <HeaderElement>
          <Dropdown>
            <LinkPanel as={Dropdown.Toggle}>
              <LinkPanel.Title>Meny</LinkPanel.Title>
            </LinkPanel>
            <Dropdown.Menu>
              <Dropdown.Menu.GroupedList>
                {MENU_LINKS.map((menuLink, index) => (
                  <Dropdown.Menu.GroupedList.Item>
                    <LinkPanel
                      href={menuLink.href}
                      key={index}
                      className={"w-full"}
                    >
                      <LinkPanel.Title>{menuLink.name}</LinkPanel.Title>
                    </LinkPanel>
                  </Dropdown.Menu.GroupedList.Item>
                ))}
              </Dropdown.Menu.GroupedList>
            </Dropdown.Menu>
          </Dropdown>
        </HeaderElement>
        <HeaderElement>
          <EnvSelector onChange={onHeaderChange} value={value} />
        </HeaderElement>
      </HStack>
    </Box>
  );
}
