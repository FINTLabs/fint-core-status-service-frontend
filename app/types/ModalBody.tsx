import {FintEvent, timeSince} from "~/types/Event";

export interface ModalBody {
    open: boolean;
    event: FintEvent | null;
}

export function formatRequestEvent(event: FintEvent | null): JSX.Element {
    return <div>
        <code>
        <p>domainName: {event?.requestEvent?.domainName}</p>
        <p>packageName: {event?.requestEvent?.packageName}</p>
        <p>resourceName: {event?.requestEvent?.resourceName}</p>
        <p>OperationType: {event?.requestEvent?.operationType}</p>
        <p>Created: {timeSince(event?.requestEvent?.created)}</p>
        <p>TimeToLive: {new Date(String(event?.requestEvent?.timeToLive)).toLocaleTimeString()}</p>
        </code>
    </div>
}

export function formatResponseEvent(event: FintEvent | null): JSX.Element {
    return <div>
        <code>
            <p>Adapterid: {event?.responseEvent?.adapterId}</p>
            <p>HandledAt: {event?.responseEvent?.handledAt ? new Date(Number(event.responseEvent.handledAt) * 1000).toLocaleTimeString() : "N/A"}</p>
            <p>OperationType: {event?.responseEvent?.operationType}</p>
            <p>Failed: {event?.responseEvent?.failed} Not failed</p>
            <p>ErrorMessage: {event?.responseEvent?.errorMessage} No error message</p>
            <p>recjected: {event?.responseEvent?.rejected} Not receted</p>
            <p>OperationType: {event?.responseEvent?.rejectReason} No reject reason</p>

        </code>
    </div>
}
