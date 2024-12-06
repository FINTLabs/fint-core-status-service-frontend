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
    return <div className={"formatResponseEvent"}>
        <code>
            <p>Adapterid: {event?.responseEvent?.adapterId}</p>
            <p>HandledAt: {new Date(String(event?.responseEvent?.handledAt)).toLocaleTimeString()}</p>
            <p>OperationType: {event?.responseEvent?.operationType}</p>
            <p>Failed: {event?.responseEvent?.failed}</p>
            <p>ErrorMessage: {event?.responseEvent?.errorMessage} ingen</p>
            <p>recjected: {event?.responseEvent?.rejected}</p>
            <p>OperationType: {event?.responseEvent?.rejectReason} null</p>

        </code>
    </div>
}
