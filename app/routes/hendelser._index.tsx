import {HStack, Pagination, SortState, Table} from "@navikt/ds-react";
import React, {useState} from "react";
import {json} from "@remix-run/node";
import {HendelserApi} from "~/api/HendelserApi";

export const loader = async () => {
  console.log("Loading...");
  try {
    const events = await HendelserApi.getHendelser()
    console.log('events: ',)
    return json(events)
  } catch (error) {
    console.log(error)
    return null;
  }
};

interface ScopedSortState extends SortState {
  orderBy: keyof (typeof data)[0];
}

export default function FintEventTable() {
  const [sort, setSort] = useState<ScopedSortState | undefined>();

  const handleSort = (sortKey: ScopedSortState["orderBy"]) => {
    setSort(
      sort && sortKey === sort.orderBy && sort.direction === "descending"
        ? undefined
        : {
          orderBy: sortKey,
          direction:
            sort && sortKey === sort.orderBy && sort.direction === "ascending"
              ? "descending"
              : "ascending",
        },
    );
  };

  function comparator<T>(a: T, b: T, orderBy: keyof T): number {
    if (b[orderBy] == null || b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }


  const sortedData = data.slice().sort((a, b) => {
    if (sort) {
      return sort.direction === "ascending"
        ? comparator(b, a, sort.orderBy)
        : comparator(a, b, sort.orderBy);
    }
    return 1;
  });

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;


  let sortData = data;
  sortData = sortData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="flex flex-col h-full justify-between gap-4">
      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">CorrId</Table.HeaderCell>
            <Table.HeaderCell scope="col">OrgId</Table.HeaderCell>
            <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
            <Table.HeaderCell scope="col">Response</Table.HeaderCell>
            <Table.HeaderCell scope="col">Feil</Table.HeaderCell>
            <Table.HeaderCell scope="col">Tid</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortData.map((bruh) => {
            return (
              <></>
            );
          })}
        </Table.Body>
      </Table>
      <HStack justify='center'>
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