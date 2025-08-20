import {ActionMenu, Button, Heading, HStack, Label, Modal, Pagination, Search, Table, Tooltip,} from "@navikt/ds-react";
import React, {useEffect, useRef, useState} from "react";
import {json, LoaderFunction} from "@remix-run/node";
import {StatusApi} from "~/api/StatusApi";
import {IAdapterContract, IContractModal} from "~/types/IAdapterContract";
import {useLoaderData} from "@remix-run/react";
import {ChevronDownIcon, HeartBrokenIcon, HeartIcon, MagnifyingGlassIcon,} from "@navikt/aksel-icons";
import {envCookie} from "~/components/cookie";
import {filterByOrgId, getOrgs,} from "~/components/komponenter/ContractFilter";
import {CapabilityStatus} from "~/components/CapabilityStatus";
import {formatComponents, timeSince} from "~/types/FintUtils";
import {NovariSnackbar, NovariSnackbarItem, useAlerts} from "novari-frontend-components";
import {size} from "valibot";

export const loader: LoaderFunction = async ({request}) => {
  const cookieHeader = request.headers.get("Cookie");
  const selectedEnv = await envCookie.parse(cookieHeader);
  const alerts: NovariSnackbarItem[] = [];
  try {
    const events = await StatusApi.getContracts(selectedEnv);
    const inactive = await StatusApi.getInactiveContracts(selectedEnv);
    inactive.forEach((item) => {
      alerts.push({
        id: item.adapterId,
        variant: "error",
        message: `Varsling om sletting av inaktive: ${item.adapterId}`
      });
    })
    return json({data: events, inactive: alerts});
  } catch (error) {
    console.error("Loader Error: ", error);
    return [];
  }
};

export default function Kontrakter() {
  const [modal, setModal] = useState<IContractModal>({
    open: false,
    contract: null,
  });

  const {data, inactive} = useLoaderData<{ data: IAdapterContract[], inactive: NovariSnackbarItem[] }>();
  const {alertState, handleCloseItem} = useAlerts<any>(inactive);
  const orgs = getOrgs(data);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [selectedOrgs, setSelectedOrgs] = useState(orgs);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [heartbeatSortOrder, setHeartbeatSortOrder] = useState<
    "none" | "healthyFirst" | "unhealthyFirst"
  >("none");

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
      filteredContracts.sort(
        (a, b) => (b.lastActivity || 0) - (a.lastActivity || 0)
      );
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

  //TODO: Fix onClear for search (not working on first click)

  //TODO: What is the first div for ?
  return (
    <div
      className="flex flex-col h-full justify-between gap-4"
      ref={tableContainerRef}
    >
      <NovariSnackbar
        items={alertState.slice(0, 3)}
        position={'top-right'}
        onCloseItem={handleCloseItem}
      />
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
          <pre className=" max-w-full max-h-96 overflow-auto text-sm">
            {JSON.stringify(modal.contract, null, 2)}
          </pre>
        </Modal.Body>
      </Modal>
      <Table style={{tableLayout: "fixed"}} size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              scope="col"
              style={{width: "400px"}}
              onBlur={() => setSearchVisible((prev) => !prev)}
            >
              {!searchVisible ? (
                <>
                  <Label className={"cursor-pointer"}>Adapter</Label>
                  <Button
                    variant="tertiary"
                    size="xsmall"
                    icon={<MagnifyingGlassIcon title="Search"/>}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSearchVisible((prev) => !prev);
                    }}
                  />
                </>
              ) : (
                <HStack gap="4" className="max-w-fit pb-4">
                  <Search
                    label={"Søk etter CorrId"}
                    hideLabel={true}
                    size="small"
                    variant={"simple"}
                    onChange={(value: string) => handleSearch(value)}
                    value={searchQuery}
                  />
                </HStack>
              )}
            </Table.HeaderCell>

            <Table.HeaderCell scope="col">
              <ActionMenu>
                <ActionMenu.Trigger>
                  <Button variant="tertiary-neutral">Organisasjon</Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                  <ActionMenu.Group label="Velg organisasjon">
                    <ActionMenu.CheckboxItem
                      checked={
                        Object.values(checkedStates).every(Boolean)
                          ? true
                          : isIndeterminate()
                            ? "indeterminate"
                            : false
                      }
                      onCheckedChange={handleSelectAll}
                    >
                      Velg alle
                    </ActionMenu.CheckboxItem>
                    {orgs.map((value, index) => (
                      <ActionMenu.CheckboxItem
                        key={index}
                        checked={checkedStates[index]}
                        onCheckedChange={() =>
                          handleCheckboxChange(value, index)
                        }
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
              style={{cursor: "pointer"}}
            >
              <Label className="cursor-pointer flex items-center">
                Heartbeat
                {heartbeatSortOrder === "healthyFirst" && (
                  <ChevronDownIcon
                    title="Sort by healthy first"
                    fontSize="0.7rem"
                  />
                )}
                {heartbeatSortOrder === "unhealthyFirst" && (
                  <ChevronDownIcon
                    title="Sort by unhealthy first"
                    fontSize="0.7rem"
                    style={{transform: "rotate(180deg)"}}
                  />
                )}
              </Label>
            </Table.HeaderCell>
            <Table.HeaderCell>Fullsync</Table.HeaderCell>
            <Table.HeaderCell scope="col">Siste overføring</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedContracts.length === 0 ? (
            <Table.Row>
              <Table.DataCell colSpan={5} className="text-center">
                No data
              </Table.DataCell>
            </Table.Row>
          ) : (
            paginatedContracts.map((contract, i) => (
              <Table.Row
                key={i}
                onClick={() => setModal({open: true, contract})}
              >
                <Table.DataCell
                  scope="row"
                  className="max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap"
                  title={contract.adapterId}
                >
                  {contract.adapterId}
                </Table.DataCell>
                <Table.DataCell scope="row">{contract.orgId}</Table.DataCell>
                <Table.DataCell scope="row">
                  {formatComponents(contract.components)}
                </Table.DataCell>
                <Table.DataCell scope="row">
                  {contract.hasContact ? (
                    <HeartIcon
                      title="Has a healthy heartbeat contact"
                      fontSize="1.5rem"
                    />
                  ) : (
                    <HeartBrokenIcon
                      title="Does not have a healthy heartbeat"
                      fontSize="1.5rem"
                    />
                  )}
                </Table.DataCell>
                <Table.DataCell onClick={(e) => e.stopPropagation()}>
                  {/*<pre>{JSON.stringify(contract.capabilities, null, 2)}</pre>*/}

                  <CapabilityStatus capabilities={contract.capabilities}/>


                </Table.DataCell>
                <Tooltip content={timeSince(contract.lastActivity)}>
                  <Table.DataCell scope="row">
                    {timeSince(contract.lastActivity)}
                  </Table.DataCell>
                </Tooltip>
              </Table.Row>
            ))
          )}
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
