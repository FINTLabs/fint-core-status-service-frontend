import {
    BodyLong,
    HGrid,
    HStack,
    Label,
    Modal,
    Pagination,
    Search,
    Table,
} from "@navikt/ds-react";
import {json, LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {FintEvent, timeSince} from "~/types/Event";
import {formatRequestEvent, formatResponseEvent, ModalBody,} from "~/types/ModalBody";
import {StatusApi} from "~/api/StatusApi";
import {Buildings3Icon, HouseIcon, MagnifyingGlassIcon, TagIcon} from "@navikt/aksel-icons";
import {useState} from "react";
import {envCookie} from "~/components/cookie";
import {ClockIcon} from '@navikt/aksel-icons';

export const loader: LoaderFunction = async ({request}) => {
    const cookieHeader = request.headers.get("Cookie");
    const selectedEnv = await envCookie.parse(cookieHeader);
    try {
        const events = await StatusApi.getHendelser(selectedEnv);
        return json(events);
    } catch (error) {
        console.error("Loader Error: ", error);
        throw new Response("Failed to load events", {status: 500});
    }
};

export default function FintEventTable() {
    const fintEvents = useLoaderData<FintEvent[]>();
    const [modal, setModal] = useState<ModalBody>(false, Event);
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
            <Modal
                width={"60%"}
                open={modal.open}
                header={{heading: String(modal.event?.corrId)}}
                closeOnBackdropClick
                onClose={() => setModal({open: false, event: null})}
            >
                <Modal.Body>
                  <BodyLong>
                    <HGrid columns={2}>
                        <HStack width={"50‰"}>
                            <pre className="bg-gray-100 p-3 rounded max-w-full max-h-96 overflow-auto text-sm">
                                {formatRequestEvent(modal.event)}
                            </pre>
                        </HStack>
                        <HStack
                            width={"50‰"}>
                             <pre className="bg-gray-100 p-3 rounded max-w-full max-h-96 overflow-auto text-sm">
                                {formatResponseEvent(modal.event)}
                            </pre>
                        </HStack>
                    </HGrid>
                      <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                          <ClockIcon  title="Time between request and response"/>
                          <span>{timeSince(modal.event?.requestEvent?.created, modal.event?.responseEvent?.handledAt)}</span>
                    </div>
                    <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                      <Buildings3Icon title="Org-Id"/>
                      <span>{modal.event?.orgId}</span>
                    </div>
                    <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                      <TagIcon title="Kafka Topic"/>
                      <span>{modal.event?.topic}</span>
                    </div>
                  </BodyLong>
                </Modal.Body>
            </Modal>
          <Table size="small">
            <Table.Header>
              <Table.Row shadeOnHover={true}>
                <Table.HeaderCell scope="col">
                  {!searchVisible ? (
                      <button
                                    className={"flex-row flex"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSearchVisible((prev) => !prev);
                                    }}
                                >
                                    <Label className={"cursor-pointer"}>CorrId</Label>
                                    <MagnifyingGlassIcon title="a11y-title" fontSize="0.7rem"/>
                                </button>
                            ) : (
                                <form>
                                    <HStack gap="4" className="max-w-fit pb-4">
                                        <Search
                                            label={"Søk etter CorrId"}
                                            hideLabel={true}
                                            size="small"
                                            variant={"simple"}
                                            onChange={(value: string) => handleSearch(value)}
                                        />
                                    </HStack>
                                </form>
                            )}
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
                            <Table.Row
                                key={i}
                                onClick={() => {
                                    setModal({open: true, event: event});
                                }}
                            >
                                <Table.HeaderCell>{event.corrId}</Table.HeaderCell>
                                <Table.HeaderCell>{event.orgId}</Table.HeaderCell>
                                <Table.HeaderCell>{createResourceUri(event)}</Table.HeaderCell>
                                <Table.HeaderCell>
                                    {String(event.responseEvent != null)}
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    {timeSince(event.requestEvent?.created)}
                                </Table.HeaderCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            <HStack justify="center">
                {fintEvents.length > 15 && (
                    <Pagination
                        page={currentPage}
                        onPageChange={(page: number) => setCurrentPage(page)}
                        count={Math.ceil(fintEvents.length / itemsPerPage)}
                        size="small"
                        className={"p-3"}
                    />
                )}
            </HStack>
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
