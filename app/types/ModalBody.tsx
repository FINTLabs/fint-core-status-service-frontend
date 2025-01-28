import {FintEvent, timeSince} from "~/types/Event";
import {BodyLong, HGrid, Modal} from "@navikt/ds-react";
import {Buildings3Icon, ClockIcon, TagIcon} from "@navikt/aksel-icons";

export interface ModalBody {
    open: boolean;
    event: FintEvent | null;
}

export function formatJson(event: any): JSX.Element {
    if (event?.event) {
        delete event.event.value;
    } else if (event?.value) {
        delete event.value;
    }

    return (
        <pre className="bg-gray-100 p-3 rounded max-w-full max-h-64 text-sm min-h-64 overflow-scroll">
            {JSON.stringify(event, null, 2)}
        </pre>
    );
}


export function formatModalBody(event: FintEvent) {
    return (
        <Modal.Body>
            <BodyLong>
                <HGrid gap="4" columns={!event?.responseEvent ? 1 : 2} className="max-w-full">
                    <div>
                        {formatJson(event?.requestEvent)}
                    </div>
                    <div>
                        {event?.responseEvent && formatJson(event?.responseEvent)}
                    </div>
                </HGrid>
                <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                    <ClockIcon title="Time between request and response"/>
                    <span>{timeSince(event?.requestEvent?.created, event?.responseEvent?.handledAt)}</span>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                    <Buildings3Icon title="Org-Id"/>
                    <span>{event?.orgId}</span>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
                    <TagIcon title="Kafka Topic"/>
                    <span>{event?.topic}</span>
                </div>
            </BodyLong>
        </Modal.Body>
    )

}
