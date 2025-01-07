import {FintEvent} from "~/types/Event";

export interface ModalBody {
    open: boolean;
    event: FintEvent | null;
}

export function formatRequestEvent(event: FintEvent | null): { JSON: undefined } {
    delete event?.requestEvent?.value;
    return (
        JSON.stringify(event?.requestEvent, null, 2)
    );
}

export function formatResponseEvent(event: FintEvent | null): { JSON: undefined } {
    delete event?.responseEvent?.value;
    return (
        JSON.stringify(event?.responseEvent, null, 2)
    );
}
