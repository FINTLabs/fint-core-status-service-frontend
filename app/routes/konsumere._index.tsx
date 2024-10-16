import {Box, HStack, Search, Select, VStack} from "@navikt/ds-react";
import ConsumerFilter from "~/components/komponenter/ConsumerFilter";
import {useState} from "react";
import FilteredConsumers from "~/components/komponenter/FilteredConsumers";
import AllConsumers from "~/components/komponenter/AllConsumers";
import {Consumer} from "~/components/komponenter/Consumer";
import Index from "~/routes/_index";

export default function Konsumere() {
    const [filter, setFilter]: boolean = useState(false)

    function createDummyConsumers(): Consumer[] {
        const lol = []
        lol[0] = {
            domain: "Utdanning",
            package: "Vurdering",
            org: "fintlabs.no",
            cacheSize: 10,
            targetCacheSize: 10
        }
        return lol
    }

    const consumers = createDummyConsumers()
    return (
        <div>
            <div>
                <Index />
            </div>
        <VStack justify="center" margin="8" gap="4">
            <ConsumerFilter/>
            {filter ? <FilteredConsumers/> : <AllConsumers consumers={consumers}/>}
        </VStack>
        </div>
    );
}