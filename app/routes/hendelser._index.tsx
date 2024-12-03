import {HStack, Pagination, SortState, Table} from "@navikt/ds-react";
import React, {useState} from "react";
import {json} from "@remix-run/node";
import {HendelserApi} from "~/api/HendelserApi";
import page from "@navikt/ds-react/src/layout/page/Page";
import {FintEvent, OperationType} from "~/types/Event";

export const loader = async () => {
  const events = await HendelserApi.getHendelser()
  return json(events)
};

const format = (date: Date) => {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${d}.${m}.${y}`;
};


const data = [
  {
    name: "Jakobsen, Markus",
    fnr: "03129265463",
    start: "2021-04-28T19:12:14.358Z",
  },
  {
    name: "Halvorsen, Mari",
    fnr: "16063634134",
    start: "2022-01-29T09:51:19.833Z",
  },
  {
    name: "Christiansen, Mathias",
    fnr: "18124441438",
    start: "2021-06-04T20:57:29.159Z",
  },
  {
    name: "Fredriksen, Leah",
    fnr: "24089080180",
    start: "2021-08-31T15:47:36.293Z",
  },
  {
    name: "Evensen, Jonas",
    fnr: "18106248460",
    start: "2021-07-17T11:13:26.116Z",
  },
];

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