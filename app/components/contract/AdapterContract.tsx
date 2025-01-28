import {Box, HStack, Spacer, VStack} from "@navikt/ds-react";
import {HeartIcon,} from "@navikt/aksel-icons";
import ComponentIcons from "~/components/contract/ComponentIcons";

export default function AdapterContract({adapterContract}) {
    return (
        <Box borderRadius="large" background="surface-subtle" padding="4" shadow="xsmall">
            <VStack gap="1">
                <HStack align="center" gap="4">
                    <VStack>
                        <p>adapter-id</p>
                        <p className="font-bold">username</p>
                    </VStack>
                    <Spacer/>
                    <HeartIcon/>
                </HStack>
                <HStack gap="2">
                    <p className="text-sm">Full Sync: 21:49 | 07.21</p>
                    <Spacer/>
                    <ComponentIcons/>
                </HStack>
            </VStack>
        </Box>
    )
}