import {ActionMenu, Button, HStack, Label, Modal, Pagination, Search, Table, Tooltip,} from "@navikt/ds-react";
import {json, LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {convertTimeStamp, FintEvent, timeSince} from "~/types/Event";
import {formatModalBody, ModalBody,} from "~/types/ModalBody";
import {StatusApi} from "~/api/StatusApi";
import {CheckmarkIcon, MagnifyingGlassIcon, XMarkIcon} from "@navikt/aksel-icons";
import React, {useState} from "react";
import {envCookie} from "~/components/cookie";
import {filterByOrgId, getOrgs} from "~/components/komponenter/EventFilter";

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
    const orgs = getOrgs(fintEvents);

    const sortedEvents = React.useMemo(() => {
        return [...fintEvents].sort((a, b) => (b.requestEvent?.created || 0) - (a.requestEvent?.created || 0));
    }, [fintEvents]);

    const [selectedOrgs, setSelectedOrgs] = useState(orgs);
    const [modal, setModal] = useState<ModalBody>(false, Event);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;
    const [searchQuery, setSearchQuery] = useState("");
    const [searchVisibleId, setsearchVisibleId] = useState(false);
    const [searchVisibleResource, setsearchVisibleResource] = useState(false);
    const [responseSortOrder, setResponseSortOrder] = useState<"default" | "hasResponse" | "noResponse">("default");

    const sortedByResponse = React.useMemo(() => {
        if (responseSortOrder === "hasResponse") {
            return sortedEvents.filter((event) => event.responseEvent);
        }
        if (responseSortOrder === "noResponse") {
            return sortedEvents.filter((event) => !event.responseEvent);
        }
        return sortedEvents;
    }, [responseSortOrder, sortedEvents]);

    const filteredByOrg = React.useMemo(() => {
        return filterByOrgId(selectedOrgs, sortedByResponse);
    }, [selectedOrgs, sortedByResponse]);

    const filteredBySearch = React.useMemo(() => {
        if (!searchQuery.trim()) return filteredByOrg;

        const lowerCaseQuery = searchQuery.toLowerCase();
        return filteredByOrg.filter((event: FintEvent) =>
            event.corrId.toLowerCase().includes(lowerCaseQuery) ||
            event.requestEvent?.resourceName.toLowerCase().includes(lowerCaseQuery)
        );
    }, [searchQuery, filteredByOrg]);

    const pagedEvents = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredBySearch.slice(startIndex, endIndex);
    }, [filteredBySearch, currentPage, itemsPerPage]);

    function handleSearch(value: string) {
        setSearchQuery(value);
        setCurrentPage(1);
    }

    const [checkedStates, setCheckedStates] = React.useState(
        orgs.reduce((acc, _, index) => {
            acc[index] = true;
            return acc;
        }, {} as Record<number, boolean>)
    );

    const handleCheckboxChange = (value: string, index: number) => {
        setCheckedStates((prevState) => {
            const newState = {
                ...prevState,
                [index]: !prevState[index],
            };

            const newSelectedOrgs = orgs.filter((_, i) => newState[i]);
            setSelectedOrgs(newSelectedOrgs);

            return newState;
        });
    };

    const handleSelectAll = () => {
        const allChecked = Object.values(checkedStates).every(Boolean);

        const newCheckedStates = orgs.reduce((acc, _, index) => {
            acc[index] = !allChecked;
            return acc;
        }, {} as Record<number, boolean>);

        setCheckedStates(newCheckedStates);
        setSelectedOrgs(!allChecked ? orgs : []);
    };

    const isIndeterminate = () => {
        const values = Object.values(checkedStates);
        return values.some(Boolean) && !values.every(Boolean);
    };

    function toggleResponseSort() {
        setResponseSortOrder((prev) => {
            if (prev === "default") return "hasResponse";
            if (prev === "hasResponse") return "noResponse";
            return "default";
        });
        setCurrentPage(1);
    }

    return (
        <div className="flex flex-col h-full justify-between gap-4">
            <Modal
                width={'60%'}
                open={modal.open}
                header={{heading: String(modal.event?.corrId)}}
                closeOnBackdropClick
                onClose={() => setModal({open: false, event: null})}
            >
                {modal.event && formatModalBody(modal.event)}
            </Modal>
            <Table size="small">
                <Table.Header>
                    <Table.Row shadeOnHover={true}>
                        <Table.HeaderCell scope="col" onBlur={() => setsearchVisibleId((prev) => !prev)}>
                            {!searchVisibleId ? (
                                <button
                                    className={"flex-row flex"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setsearchVisibleId((prev) => !prev);
                                    }}>
                                    <Label className={"cursor-pointer"}>Hendelse ID</Label>
                                    <MagnifyingGlassIcon title="Search" fontSize="0.7rem"/>
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
                        <Table.HeaderCell scope="col">
                            <ActionMenu>
                                <ActionMenu.Trigger>
                                    <Button
                                        variant="tertiary-neutral"
                                    >
                                        Organisasjon
                                    </Button>
                                </ActionMenu.Trigger>
                                <ActionMenu.Content>
                                    <ActionMenu.Group label="Velg organisasjon">
                                        <ActionMenu.CheckboxItem
                                            checked={Object.values(checkedStates).every(Boolean) ? true : isIndeterminate() ? "indeterminate" : false}
                                            onCheckedChange={handleSelectAll}
                                        >
                                            Velg alle
                                        </ActionMenu.CheckboxItem>
                                        {orgs.map((value, index) => (
                                            <ActionMenu.CheckboxItem
                                                key={index}
                                                checked={checkedStates[index]}
                                                onCheckedChange={() => handleCheckboxChange(value, index)}
                                            >
                                                {value}
                                            </ActionMenu.CheckboxItem>
                                        ))}
                                    </ActionMenu.Group>
                                </ActionMenu.Content>
                            </ActionMenu>
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col" onBlur={() => setsearchVisibleResource((prev) => !prev)}>
                            {!searchVisibleResource ? (
                                <button
                                    className={"flex-row flex"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setsearchVisibleResource((prev) => !prev);
                                    }}>
                                    <Label className={"cursor-pointer"}>Resurser</Label>
                                    <MagnifyingGlassIcon title="Search" fontSize="0.7rem"/>
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
                        <Table.HeaderCell scope="col" onClick={toggleResponseSort} style={{cursor: "pointer"}}>
                            Response {responseSortOrder === "hasResponse" ? "↑" : responseSortOrder === "noResponse" ? "↓" : ""}
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col">Overført</Table.HeaderCell>
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
                                style={{cursor: "pointer"}}
                            >
                                <Table.DataCell>{event.corrId}</Table.DataCell>
                                <Table.DataCell>{event.orgId}</Table.DataCell>
                                <Table.DataCell>{createResourceUri(event)}</Table.DataCell>
                                <Table.DataCell>
                                    {event.responseEvent ? (<CheckmarkIcon title="Has response" fontSize="1.5rem"/>) : (
                                        <XMarkIcon title="No response" fontSize="1.5rem"/>)}
                                </Table.DataCell>
                                <Tooltip content={timeSince(event.requestEvent?.created)}>
                                    <Table.DataCell>
                                        {convertTimeStamp(Number(event.requestEvent?.created))}
                                    </Table.DataCell>
                                </Tooltip>
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

const createResourceUri = (event: any) => {
    const requestEvent = event.requestEvent;

    if (!requestEvent) {
        return "N/A";
    }

    const domainName = requestEvent.domainName || "unknown-domain";
    const packageName = requestEvent.packageName || "unknown-package";
    const resourceName = requestEvent.resourceName || "unknown-resource";

    return `${domainName}/${packageName}/${resourceName}`;
};
