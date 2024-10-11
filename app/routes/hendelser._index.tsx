import {HStack, Table} from "@navikt/ds-react";
import React from "react";
import {useState} from "react";
import { Search } from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {HendelserApi} from "~/api/HendelserApi";
import {FintEvent} from "~/components/hendelser/event/FintEvent";
import {useLoaderData} from "@remix-run/react";

export const loader = async () => {
    const events = await HendelserApi.getHendelser()
    return json(events)
};

export default function FintEventTable() {
    const events = useLoaderData<FintEvent[]>();
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const toggleRow = (index: number) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(index)) {
            newExpandedRows.delete(index);
        } else {
            newExpandedRows.add(index);
        }
        setExpandedRows(newExpandedRows);
    };

    const formatTime = (event: FintEvent): string | null => {
        if (event.requestEvent != null) {
            const createdTimestamp = event.requestEvent.created;
            const createdDate = new Date(createdTimestamp * 1000);

            const day = createdDate.getDate();
            const month = createdDate.getMonth() + 1;
            const hours = createdDate.getHours();
            const minutes = createdDate.getMinutes().toString().padStart(2, '0');
            const seconds = createdDate.getSeconds();

            return `${day}/${month} kl:${hours}:${minutes}:${seconds}`;
        }
        return null;
    };

    const searchBar = () => {
        return (
            <form  role="search"
                   className="search-bar"
                   style={{
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       width: '300px',
                       marginBottom: '20px'
                   }}>
                <Search label="Søk etter corrId" variant="secondary"/>
            </form>
        );
    };

    return (
        <div style={{marginTop: "30px", marginRight: '30px', marginLeft: '30px'}}>
            <HStack justify="center">
                {searchBar()}
            </HStack>
            <Table zebraStripes>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Corrid</Table.HeaderCell>
                    <Table.HeaderCell scope="col">OrgId</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Har Feil</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Har response</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Resurs</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Request time</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {events.map((event, i) => (
                    <React.Fragment key={i}>
                        <Table.Row onClick={() => toggleRow(i)} style={{ cursor: 'pointer' }}>
                            <Table.DataCell>{event.corrId}</Table.DataCell>
                            <Table.DataCell>{event.ordId}</Table.DataCell>
                            <Table.DataCell>{event.hasError ? "Ja" : "Nei"}</Table.DataCell>
                            <Table.DataCell>{event.responseEvent ? "Ja" : "Nei"}</Table.DataCell>
                            <Table.DataCell>{event.requestEvent.resourceName}</Table.DataCell>
                            <Table.DataCell>{formatTime(event)}</Table.DataCell>
                        </Table.Row>
                        {expandedRows.has(i) && (
                            <Table.Row>
                                <Table.DataCell colSpan={4} style={{ paddingLeft: '40px' }}>
                                    {event.responseEvent ? (
                                        <div>
                                            <strong>Response Event:</strong> {event.responseEvent.corrId}
                                        </div>
                                    ) : (
                                        <div>No Response Event</div>
                                    )}
                                </Table.DataCell>
                            </Table.Row>
                        )}
                    </React.Fragment>
                ))}
            </Table.Body>
        </Table>
        </div>
    )
}