import {
    ActionMenu,
    BodyLong, Button,
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
import {convertTimeStamp, FintEvent, timeSince} from "~/types/Event";
import {formatRequestEvent, formatResponseEvent, ModalBody,} from "~/types/ModalBody";
import {StatusApi} from "~/api/StatusApi";
import {Buildings3Icon, CheckmarkIcon, MagnifyingGlassIcon, TagIcon} from "@navikt/aksel-icons";
import React, {useState} from "react";
import {envCookie} from "~/components/cookie";
import {ClockIcon} from '@navikt/aksel-icons';
import { XMarkIcon } from '@navikt/aksel-icons';
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
    const [selectedOrgs, setSelectedOrgs] = useState(orgs);
    const [modal, setModal] = useState<ModalBody>(false, Event);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;
    const [searchQuery, setSearchQuery] = useState("");
    const [searchVisible, setSearchVisible] = useState(false);
    const sortedBadedOnTimeStamp = fintEvents.sort((a, b) => (a.requestEvent?.created || 0) - (b.requestEvent?.created || 0)).reverse();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filterdByOrg = filterByOrgId(selectedOrgs, sortedBadedOnTimeStamp)
    const pagedEvents = filterdByOrg.slice(startIndex, endIndex);

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
                        <HStack width={"50‰"}>
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
                                    <Label className={"cursor-pointer"}>Hendelse ID</Label>
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
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Response</Table.HeaderCell>
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
                            >
                                <Table.DataCell>{event.corrId}</Table.DataCell>
                                <Table.DataCell>{event.orgId}</Table.DataCell>
                                <Table.DataCell>{createResourceUri(event)}</Table.DataCell>
                                <Table.DataCell>
                                    {event.responseEvent? (<CheckmarkIcon title="a11y-title" fontSize="1.5rem" />) : (<XMarkIcon title="a11y-title" fontSize="1.5rem" />)  }
                                </Table.DataCell>
                                <Table.DataCell>
                                    {convertTimeStamp(Number(event.requestEvent?.created))}
                                </Table.DataCell>
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
