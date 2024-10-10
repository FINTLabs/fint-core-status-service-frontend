import {Table} from "@navikt/ds-react";
import React from "react";
import {useState} from "react";

interface RequestEvent {}
interface ResponseEvent {}

interface FintEvent {
    corrid: string;
    orgId: string;
    hassError: boolean;
    requestEvent: RequestEvent | null;
    responseEvent: ResponseEvent | null;
}



export default function FintEventTable() {
    const events: FintEvent[] = [
        {
            corrId: "123344433343",
            ordId: "679846732",
            hasError: false,
            requestEvent: {
                corrId: "22204948282",
                ordId: "679846732",
                domainName: "Utdanning",
                packageName: "Elev",
                resourceName: "Elev",
                operationType: null,
                created: 1728481278,
                timeToLive: 3443343

            },
            responseEvent: {
                corrId: "22"
            },
        },
        {
            corrId: "454334453346",
            ordId: "434362436",
            hasError: true,
            requestEvent: {
                corrId: "309294950",
                ordId: "339205054",
                domainName: "Administrasjon",
                packageName: "Personal",
                resourceName: "Personal",
                operationType: null,
                created: 1728481278,
                timeToLive: 3434008
            },
            responseEvent: null
        },
    ];


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

    return (
        <div style={{ marginTop: "30px", marginRight: '30px', marginLeft: '30px'}}>
        <Table zebraStripes>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Corrid</Table.HeaderCell>
                    <Table.HeaderCell scope="col">OrgId</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Har Feil</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Har response</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Domene/pakke/resurs</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Request time</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {events.map((event, i) => (
                    <React.Fragment key={i}>
                        <Table.Row onClick={() => toggleRow(i)} style={{ cursor: 'pointer' }}>
                            <Table.DataCell>{event.corrId}</Table.DataCell>
                            <Table.DataCell>{event.ordId}</Table.DataCell>
                            <Table.DataCell>{event.hasError ? "Yes" : "No"}</Table.DataCell>
                            <Table.DataCell>{event.responseEvent ? "Ja" : "Nei"}</Table.DataCell>
                            <Table.DataCell>{event.requestEvent.domainName}/{event.requestEvent.packageName}/{event.requestEvent.resourceName}</Table.DataCell>
                            <Table.DataCell>{event.requestEvent.created}</Table.DataCell>
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