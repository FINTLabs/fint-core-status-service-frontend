import {
    ActionMenu,
    BodyLong, Button,
    Heading,
    HStack,
    Label,
    Modal,
    Pagination,
    Search,
    Table,
} from "@navikt/ds-react";
import React, {useEffect, useRef, useState} from "react";
import {json, LoaderFunction} from "@remix-run/node";
import {StatusApi} from "~/api/StatusApi";
import {AdapterContract, ContractModal, convertLastActivity, formatComponents} from "~/types/AdapterContract";
import {useLoaderData} from "@remix-run/react";
import {ChevronDownIcon, HeartBrokenIcon, HeartIcon, MagnifyingGlassIcon} from "@navikt/aksel-icons";
import {envCookie} from "~/components/cookie";
import {filterByOrgId, getComponents, getOrgs} from "~/components/komponenter/ContractFilter";

export const loader: LoaderFunction = async ({request}) => {
    const cookieHeader = request.headers.get("Cookie");
    const selectedEnv = await envCookie.parse(cookieHeader);
    try {
        const events = await StatusApi.getContracts(selectedEnv);
        return json(events);
    } catch (error) {
        console.error("Loader Error: ", error);
        throw new Response("Failed to load events", {status: 500});
    }
};


export default function Kontrakter() {
    const [modal, setModal] = useState<ContractModal>({
        open: false,
        contract: null,
    });

    const data = useLoaderData<AdapterContract[]>();
    const orgs = getOrgs(data);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [selectedOrgs, setSelectedOrgs] = useState(orgs);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchVisible, setSearchVisible] = useState(false);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const [heartbeatSortOrder, setHeartbeatSortOrder] = useState<"none" | "healthyFirst" | "unhealthyFirst">("none");

    const [checkedStates, setCheckedStates] = React.useState(
        orgs.reduce((acc, _, index) => {
            acc[index] = true;
            return acc;
        }, {} as Record<number, boolean>)
    );

    const displayedContracts = React.useMemo(() => {
        let filteredContracts = [...data];

        filteredContracts = filterByOrgId(selectedOrgs, filteredContracts);

        if (searchQuery) {
            filteredContracts = filteredContracts.filter((contract) =>
                contract.adapterId?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (heartbeatSortOrder === "healthyFirst") {
            filteredContracts.sort((a, b) => {
                if (a.hasContact === b.hasContact) return 0;
                return a.hasContact ? -1 : 1;
            });
        } else if (heartbeatSortOrder === "unhealthyFirst") {
            filteredContracts.sort((a, b) => {
                if (a.hasContact === b.hasContact) return 0;
                return a.hasContact ? 1 : -1;
            });
        } else {
            filteredContracts.sort((a, b) => (b.lastActivity || 0) - (a.lastActivity || 0));
        }

        return filteredContracts;
    }, [data, selectedOrgs, searchQuery, heartbeatSortOrder]);

    const paginatedContracts = React.useMemo(() => {
        return displayedContracts.slice(
            (page - 1) * rowsPerPage,
            page * rowsPerPage
        );
    }, [displayedContracts, page, rowsPerPage]);

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
        setSelectedOrgs(!allChecked ? [...orgs] : []);
    };

    const isIndeterminate = () => {
        const values = Object.values(checkedStates);
        return values.some(Boolean) && !values.every(Boolean);
    };

    useEffect(() => {
        const calculateRowsPerPage = () => {
            if (tableContainerRef.current) {
                const containerHeight = tableContainerRef.current.clientHeight;
                const rowHeight = 35;
                const headerHeight = 30;
                const availableHeight = containerHeight - headerHeight;
                setRowsPerPage(Math.floor(availableHeight / rowHeight));
            }
        };

        calculateRowsPerPage();

        window.addEventListener("resize", calculateRowsPerPage);
        return () => {
            window.removeEventListener("resize", calculateRowsPerPage);
        };
    }, []);

    function handleSearch(value: string) {
        setSearchQuery(value);
        setPage(1);
    }

    return (
        <div
            className="flex flex-col h-full justify-between gap-4"
            ref={tableContainerRef}
        >
            <Modal
                open={modal.open}
                onClose={() => setModal({open: false, contract: null})}
                aria-labelledby="modal-heading"
                closeOnBackdropClick
            >
                <Modal.Header>
                    <Heading level="1" size="small" id="modal-heading">
                        {modal.contract?.adapterId}
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    <BodyLong className="">
            <pre className="bg-gray-100 p-3 rounded max-w-full max-h-96 overflow-auto text-sm">
              {JSON.stringify(modal.contract, null, 2)}
            </pre>
                    </BodyLong>
                </Modal.Body>
            </Modal>
            <Table
                size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            scope="col"
                            style={{minWidth: "300px"}}>
                            {!searchVisible ? (
                                <button
                                    className={"flex-row flex"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSearchVisible((prev) => !prev);
                                    }}
                                >
                                    <Label className={"cursor-pointer"}>Adapter</Label>
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
                        <Table.HeaderCell scope="col">Komponenter</Table.HeaderCell>
                        <Table.HeaderCell
                            scope="col"
                            onClick={() => {
                                setHeartbeatSortOrder((prev) => {
                                    if (prev === "none") return "healthyFirst";
                                    if (prev === "healthyFirst") return "unhealthyFirst";
                                    return "none";
                                });
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <Label className="cursor-pointer flex items-center">
                                Heartbeat
                                {heartbeatSortOrder === "healthyFirst" && (
                                    <ChevronDownIcon title="Sort by healthy first" fontSize="0.7rem" />
                                )}
                                {heartbeatSortOrder === "unhealthyFirst" && (
                                    <ChevronDownIcon title="Sort by unhealthy first" fontSize="0.7rem" style={{ transform: "rotate(180deg)" }} />
                                )}
                            </Label>
                        </Table.HeaderCell>
                        <Table.HeaderCell scope="col">Siste overføring</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {paginatedContracts.map((contract, i) => {
                        return (
                            <Table.Row
                                key={i}
                                onClick={() => setModal({open: true, contract: contract})}
                            >
                                <Table.DataCell
                                    scope="row"
                                    className="max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap"
                                    title={contract.adapterId}
                                >
                                    {contract.adapterId}
                                </Table.DataCell>
                                <Table.DataCell scope="row">
                                    {contract.orgId}
                                </Table.DataCell>
                                <Table.DataCell scope="row">
                                    {formatComponents(contract.components)}
                                </Table.DataCell>
                                <Table.DataCell scope="row">
                                    {contract.hasContact ? (
                                        <HeartIcon title="Has a healty heartbeat kontakt" fontSize="1.5rem"/>) : (
                                        <HeartBrokenIcon title="Does not have a healty heartbeat" fontSize="1.5rem"/>)}
                                </Table.DataCell>
                                <Table.DataCell
                                    scope="row">{convertLastActivity(contract.lastActivity)}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            <HStack justify="center">
                <Pagination
                    page={page}
                    onPageChange={setPage}
                    count={Math.ceil(data.length / rowsPerPage)}
                    size="small"
                />
            </HStack>
        </div>
    );
}
