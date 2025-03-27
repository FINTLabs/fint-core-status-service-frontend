import { convertTimeStamp, IFintEvent, timeSince } from "~/types/IFintEvent";
import { BodyLong, HGrid, HStack, Modal } from "@navikt/ds-react";
import {
  ArrowsSquarepathIcon,
  Buildings3Icon,
  HourglassIcon,
  PaperplaneIcon,
  TagIcon,
} from "@navikt/aksel-icons";

export interface ModalBody {
  open: boolean;
  event: IFintEvent | null;
}

//TODO: i am sorry, but WTF!?? round and round we go...
export function formatJson(event: IFintEvent): JSX.Element {
  if (event.requestFintEvent?.value) {
    event.requestFintEvent.value = formatJson(event);
    delete event.requestFintEvent.value;
  } else if (event.responseFintEvent?.value) {
    delete event.responseFintEvent.value;
  }

  return (
    <pre className="bg-gray-100 p-3 rounded max-w-full max-h-64 text-sm min-h-64 overflow-scroll">
      {JSON.stringify(event, null, 2)}
    </pre>
  );
}

export function formatModalBody(event: IFintEvent) {
  return (
    <Modal.Body>
      <BodyLong>
        <HGrid
          gap="4"
          columns={!event?.responseEvent ? 1 : 2}
          className="max-w-full"
        >
          <div>{formatJson(event?.requestEvent)}</div>
          <div>{event?.responseEvent && formatJson(event?.responseEvent)}</div>
        </HGrid>
        <HStack style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <HourglassIcon title="Time between request and response" />
          {timeSince(
            event?.requestEvent?.created,
            event?.responseEvent?.handledAt
          )}
          <PaperplaneIcon title="Created" />
          {convertTimeStamp(event?.requestEvent?.created)}
          <ArrowsSquarepathIcon title="handledAt" />
          {convertTimeStamp(event?.responseEvent?.handledAt)}
        </HStack>
        <HStack style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Buildings3Icon title="Org-Id" />
          {event?.orgId}
        </HStack>
        <HStack style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <TagIcon title="Kafka Topic" />
          {event?.topic}
        </HStack>
      </BodyLong>
    </Modal.Body>
  );
}
