import {HStack, Label, Pagination, Search, Table} from "@navikt/ds-react";
import {useState} from "react";
import {json, LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {FintEvent, timeSince} from "~/types/Event";
import {HendelserApi} from "~/api/HendelserApi";
import MockFintEvents from "~/mockFintEvents";
import {MagnifyingGlassIcon} from "@navikt/aksel-icons";

export const loader: LoaderFunction = async () => {
    try {
        const events = MockFintEvents;
        return json(events);
    } catch (error) {
        console.error("Loader Error: ", error);
        throw new Response("Failed to load events", {status: 500});
    }
};

// await HendelserApi.getHendelser("beta")

export default function FintEventTable() {
    const fintEvents = useLoaderData<FintEvent[]>();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 15;
    const [searchQuery, setSearchQuery] = useState("");
    const [searchVisible, setSearchVisible] = useState(false);


    const filteredEvents = fintEvents.filter(
        (event) =>
            event.corrId?.toLowerCase().includes(searchQuery.toLowerCase()) &&
            event.requestEvent != null &&
            event.requestEvent.domainName != null
    );


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedEvents = filteredEvents.slice(startIndex, endIndex);


    function handleSearch(value: string) {
        setSearchQuery(value);
        setCurrentPage(1);
    }


    return (
        <div className="flex flex-col h-full justify-between gap-4">
            <form>
                <HStack gap='4' className='max-w-fit pb-4'>
                    {
                        searchVisible ?

                    <Search
                        label={"Søk etter CorrId"}
                        hideLabel={false}
                        size='small'
                        variant={"secondary"}
                        onChange={(value : string ) => handleSearch(value)}
                    />
                     : <></>
                    }
                </HStack>

            <Table size="small">

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col" className={"w-24"}>
                            <button
                                className={"flex-row flex"}
                                onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSearchVisible((prev) => !prev);
                            }}>
                            <Label className={"cursor-pointer"}>
                                CorrId
                            </Label>
                                <MagnifyingGlassIcon  title="a11y-title" fontSize="0.7rem" />
                            </button>
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col">OrgId</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Response</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Tid siden</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {pagedEvents.map((event, i) => {
                        return (
                            <Table.Row key={i}>
                                <Table.HeaderCell>{event.corrId}</Table.HeaderCell>
                                <Table.HeaderCell>{event.orgId}</Table.HeaderCell>
                                <Table.HeaderCell>{createResourceUri(event)}</Table.HeaderCell>
                                <Table.HeaderCell>{String(event.responseEvent != null)}</Table.HeaderCell>
                                <Table.HeaderCell>{timeSince(event.requestEvent?.created)}</Table.HeaderCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            <HStack justify='center'>
                {filteredEvents.length > 15 && (
                <Pagination
                    page={currentPage}
                    onPageChange={(page: number) => setCurrentPage(page)}
                    count={Math.ceil(filteredEvents.length / itemsPerPage)}
                    size="small"
                    className={'p-3'}
                />
                )}
            </HStack>
            </form>
        </div>
    );
}

const createResourceUri = (event) => {
    const requestEvent = event.requestEvent;

    if (!requestEvent) {
        return "N/A";
    }

    const domainName = requestEvent.domainName || "unknown-domain";
    const packageName = requestEvent.packageName || "unknown-package";
    const resourceName = requestEvent.resourceName || "unknown-resource";

    return `${domainName}/${packageName}/${resourceName}`;
};