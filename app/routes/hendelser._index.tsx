import {HStack, Pagination, Table} from "@navikt/ds-react";
import {useState} from "react";
import {json, LoaderFunction} from "@remix-run/node";
import {HendelserApi} from "~/api/HendelserApi";
import {useLoaderData} from "@remix-run/react";
import {FintEvent} from "~/types/Event";

export const loader: LoaderFunction = async () => {
  try {
    const events = await HendelserApi.getHendelser("beta");
    console.log("events: ", events);
    return json(events);
  } catch (error) {
    console.error("Loader Error: ", error);
    throw new Response("Failed to load events", {status: 500});
  }
};

export default function FintEventTable() {
  const fintEvents = useLoaderData<FintEvent[]>();
  const filteredEvents = fintEvents.filter(s => s.requestEvent!= null && s.requestEvent.domainName != null)

  const [page, setPage] = useState(1);
  const rowsPerPage = 4;

  return (
    <div className="flex flex-col h-full justify-between gap-4">
      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">CorrId</Table.HeaderCell>
            <Table.HeaderCell scope="col">OrgId</Table.HeaderCell>
            <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
            <Table.HeaderCell scope="col">Response</Table.HeaderCell>
            <Table.HeaderCell scope="col">Tid</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredEvents.map((event, i) => {
            return (
              <Table.Row key={i}>
                <Table.HeaderCell>{event.corrId}</Table.HeaderCell>
                <Table.HeaderCell>{event.orgId}</Table.HeaderCell>
                <Table.HeaderCell>{createResourceUri(event)}</Table.HeaderCell>
                <Table.HeaderCell>{String(event.responseEvent === null)}</Table.HeaderCell>
                <Table.HeaderCell>{event.requestEvent ? event.requestEvent.created : "N/A"}</Table.HeaderCell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <HStack justify='center'>
        <Pagination
          page={page}
          onPageChange={setPage}
          count={Math.ceil(fintEvents.length / rowsPerPage)}
          size="small"
        />
      </HStack>
    </div>
  );
}

const createResourceUri = (event) => {
  const requestEvent = event.requestEvent;

  if (!requestEvent) {
    return "N/A"; // Fallback value if requestEvent is null
  }

  const domainName = requestEvent.domainName || "unknown-domain";
  const packageName = requestEvent.packageName || "unknown-package";
  const resourceName = requestEvent.resourceName || "unknown-resource";

  return `${domainName}/${packageName}/${resourceName}`;
};