import {Box, HStack, Search} from "@navikt/ds-react";

export default function ConsumerFilter() {
  return (
    <HStack justify="center">
      <Box background="surface-subtle" padding="4" borderRadius="large" shadow="xsmall">
        <HStack gap="2">
          <form role="search">
            <Search label="Søk alle NAV sine sider" variant="primary"/>
          </form>
          <form role="search">
            <Search label="Søk alle NAV sine sider" variant="secondary"/>
          </form>
        </HStack>
      </Box>
    </HStack>
  )
}