import {Box, HStack, LinkPanel, VStack} from "@navikt/ds-react";
import {MENU_LINKS} from "~/constants/menu";

export default function Header() {
    return (
        <Box shadow="small" className='flex justify-center h-24' borderRadius="0 0 xlarge xlarge">
          <VStack gap='6' justify='center' align="center">
            <HStack gap='4' className='max-w-fit'>
              {MENU_LINKS.map((menuLink, index) => (
                <LinkPanel href={menuLink.href} key={index}>
                  <LinkPanel.Title>{menuLink.name}</LinkPanel.Title>
                </LinkPanel>
              ))}
            </HStack>
          </VStack>
        </Box>
    )
}

