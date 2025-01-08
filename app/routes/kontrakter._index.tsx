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
import React, { useEffect, useRef, useState } from "react";
import { json, LoaderFunction } from "@remix-run/node";
import { StatusApi } from "~/api/StatusApi";
import {AdapterContract, ContractModal, convertLastActivity, formatComponents} from "~/types/AdapterContract";
import { useLoaderData } from "@remix-run/react";
import {ChevronDownIcon, MagnifyingGlassIcon} from "@navikt/aksel-icons";
import {envCookie} from "~/components/cookie";
import {filterByOrgId} from "~/components/komponenter/ContractFilter";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const selectedEnv = await envCookie.parse(cookieHeader);
  try {
    const events = await StatusApi.getContracts(selectedEnv);
    return json(events);
  } catch (error) {
    console.error("Loader Error: ", error);
    throw new Response("Failed to load events", { status: 500 });
  }
};

export default function Kontrakter() {
  const contracts = useLoaderData<AdapterContract[]>();
  const [modal, setModal] = useState<ContractModal>({
    open: false,
    contract: null,
  });
  const filterdByOrg = filterByOrgId("telemarkfylke.no", contracts);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const sortBasedOnLastActivity = filterdByOrg.sort((a, b) => (a.lastActivity || 0) - (b.lastActivity || 0));
  sortBasedOnLastActivity.reverse();

  const [views, setViews] = React.useState({
    started: true,
    fnr: false,
    tags: true,
  });

  const [rows, setRows] = React.useState<string>("5");

  const handleCheckboxChange = (checkboxId: string) => {
    setViews((prevState) => ({
      ...prevState,
      [checkboxId]: !prevState[checkboxId],
    }));
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

  const filteredContracts = sortBasedOnLastActivity.filter(
    (contract) =>
      searchQuery === "" ||
      contract.adapterId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortData = filteredContracts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
        onClose={() => setModal({ open: false, contract: null })}
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
      <Table size="small">
        <Table.Header>
          <Table.Row>
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
                  <Label className={"cursor-pointer"}>AdapterId</Label>
                  <MagnifyingGlassIcon title="a11y-title" fontSize="0.7rem" />
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
                      icon={<ChevronDownIcon aria-hidden />}
                      iconPosition="right"
                  >
                    OrgId
                  </Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                  <ActionMenu.Group label="Organisasjoner" >
                    <ActionMenu.CheckboxItem
                        checked={
                          Object.values(views).every(Boolean)
                              ? true
                              : Object.values(views).some(Boolean)
                                  ? "indeterminate"
                                  : false
                        }
                        onCheckedChange={() => {
                          // const allChecked = Object.values(views).every(Boolean);
                          // setViews((prevState) =>
                          //     Object.keys(prevState).reduce(
                          //         (acc, key) => {
                          //           acc[key] = !allChecked;
                          //           return acc;
                          //         },
                          //         {} as typeof views,
                          //     ),
                          // );
                        }}
                    >
                      Velg alle
                    </ActionMenu.CheckboxItem>
                  </ActionMenu.Group>
                </ActionMenu.Content>
              </ActionMenu>
            </Table.HeaderCell>
            <Table.HeaderCell scope="col">Components</Table.HeaderCell>
            <Table.HeaderCell scope="col">Healthy heartbeats</Table.HeaderCell>
            <Table.HeaderCell scope="col">Last Activity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortData.map((contract, i) => {
            return (
              <Table.Row
                key={i}
                onClick={() => setModal({ open: true, contract: contract })}
              >
                <Table.HeaderCell
                  scope="row"
                  className="max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap"
                  title={contract.adapterId}
                >
                  {contract.adapterId}
                </Table.HeaderCell>
                <Table.HeaderCell scope="row">
                  {contract.orgId}
                </Table.HeaderCell>
                <Table.HeaderCell scope="row">
                  {formatComponents(contract.components)}
                </Table.HeaderCell>
                <Table.HeaderCell scope="row">
                  {String(contract.hasContact)}
                </Table.HeaderCell>
                <Table.HeaderCell scope="row">{convertLastActivity(contract.lastActivity)}</Table.HeaderCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <HStack justify="center">
        <Pagination
          page={page}
          onPageChange={setPage}
          count={Math.ceil(contracts.length / rowsPerPage)}
          size="small"
        />
      </HStack>
    </div>
  );
}
