import {HStack, Pagination, Table} from "@navikt/ds-react";
import {useState} from "react";
import {json, LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {FintEvent, timeSince} from "~/types/Event";
import {HendelserApi} from "~/api/HendelserApi";

export const loader: LoaderFunction = async () => {
    try {
        const events = await HendelserApi.getHendelser("beta");
        return json(events);
    } catch (error) {
        console.error("Loader Error: ", error);
        throw new Response("Failed to load events", {status: 500});
    }
};

export default function FintEventTable() {
    const fintEvents = useLoaderData<FintEvent[]>();
    const filteredEvents = fintEvents.filter(s => s.requestEvent != null && s.requestEvent.domainName != null)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 15;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pagedEvents = filteredEvents.slice(startIndex, endIndex);

    return (
        <div className="flex flex-col h-full justify-between gap-4">
            <Table size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">CorrId</Table.HeaderCell>
                        <Table.HeaderCell scope="col">OrgId</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Ressurs</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Response</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Tid siden</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {pagedEvents.map((event, i) => {
                        return (
                            <Table.Row key={i}>
                                <Table.HeaderCell>{event.corrId}</Table.HeaderCell>
                                <Table.HeaderCell>{event.orgId}</Table.HeaderCell>
                                <Table.HeaderCell>{createResourceUri(event)}</Table.HeaderCell>
                                <Table.HeaderCell>{String(event.responseEvent != null)}</Table.HeaderCell>
                                <Table.HeaderCell>{timeSince(event.requestEvent?.created)}</Table.HeaderCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            <HStack justify='center'>
                {filteredEvents.length > 15 && (
                <Pagination
                    page={currentPage}
                    onPageChange={(page: number) => setCurrentPage(page)}
                    count={Math.ceil(filteredEvents.length / itemsPerPage)}
                    size="small"
                    className={'p-3'}
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