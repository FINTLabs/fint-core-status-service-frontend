import {BodyLong, Heading, HStack, Modal, Pagination, Table} from "@navikt/ds-react";
import {useEffect, useRef, useState} from "react";
import {json, LoaderFunction} from "@remix-run/node";
import {StatusApi} from "~/api/StatusApi";
import {AdapterContract, ContractModal} from "~/types/AdapterContract";
import {useLoaderData} from "@remix-run/react";

export const loader: LoaderFunction = async () => {
  try {
    const events = await StatusApi.getContracts("beta");
    return json(events);
  } catch (error) {
    console.error("Loader Error: ", error);
    throw new Response("Failed to load events", {status: 500});
  }
};

export default function Kontrakter() {
  const contracts = useLoaderData<AdapterContract[]>();
  const [modal, setModal] = useState<ContractModal>({open: false, contract: null});
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const tableContainerRef = useRef<HTMLDivElement>(null);

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

  const sortData = contracts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="flex flex-col h-full justify-between gap-4" ref={tableContainerRef}>
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
      <Table size="small">
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell scope="col">AdapterId</Table.HeaderCell>
            <Table.HeaderCell scope="col">OrgId</Table.HeaderCell>
            <Table.HeaderCell scope="col">Components</Table.HeaderCell>
            <Table.HeaderCell scope="col">Healthy heartbeats</Table.HeaderCell>
            <Table.HeaderCell scope="col">Last Activity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortData.map((contract, i) => {
            return (
              <Table.Row key={i} onClick={() => setModal({open: true, contract: contract})}>
                <Table.HeaderCell
                  scope="row"
                  className="max-w-[400px] overflow-hidden text-ellipsis whitespace-nowrap"
                  title={contract.adapterId}
                >
                  {contract.adapterId}
                </Table.HeaderCell>
                <Table.HeaderCell scope="row">{contract.orgId}</Table.HeaderCell>
                <Table.HeaderCell scope="row">do it later</Table.HeaderCell>
                <Table.HeaderCell scope="row">{String(contract.hasContact)}</Table.HeaderCell>
                <Table.HeaderCell scope="row">do it later</Table.HeaderCell>
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
