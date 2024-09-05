import {Box, HGrid, LinkPanel, VStack} from "@navikt/ds-react";
import {MENU_LINKS} from "~/constants/menu";

export default function Index() {
  return (
    <Box>
      <VStack gap="6" justify={'center'} align="center">
        <HGrid className="pt-4" gap="3" columns={{xs: 1, sm: 2, md: 4, lg: 4, xl: 4}}>
          {MENU_LINKS.map((menuLink, index) => (
            <LinkPanel href={menuLink.href} key={index}>
              <LinkPanel.Title>{menuLink.name}</LinkPanel.Title>
            </LinkPanel>
          ))}
        </HGrid>
      </VStack>
    </Box>
  );
}
