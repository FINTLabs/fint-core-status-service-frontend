import {
  Modal,
  Button,
  Heading,
  Tabs,
  CopyButton,
  Box,
  HStack,
  Detail,
  VStack,
  Label,
} from "@navikt/ds-react";
import type { IRequestEvent, IResponseEvent } from "~/types/Event";

interface HendelserModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestData: IRequestEvent | null;
  responseData: IResponseEvent | null;
}

export function EventsModal({
  isOpen,
  onClose,
  requestData,
  responseData,
}: HendelserModalProps) {
  const formatTimestamp = (timestamp?: number | null) => {
    if (!timestamp) {
      return "Ikke tilgjengelig";
    }

    return new Date(timestamp).toLocaleString("no-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatJson = (data: unknown) => {
    return JSON.stringify(data, null, 2);
  };

  const renderOperationBadge = (operation?: string | null) => {
    if (!operation) {
      return <span className="text-ax-neutral-600">Ikke tilgjengelig</span>;
    }

    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    const colorClass =
      operation === "CREATE"
        ? "bg-ax-success-200 text-ax-success-900"
        : operation === "UPDATE"
          ? "bg-ax-accent-200 text-ax-accent-900"
          : "bg-ax-danger-200 text-ax-danger-900";

    return <span className={`${baseClasses} ${colorClass}`}>{operation}</span>;
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="hendelser-modal-title"
      aria-describedby="hendelser-modal-description"
      placement="top"
    >
      <Modal.Header>
        <Heading id="hendelser-modal-title" size="medium">
          Hendelse Detaljer:
        </Heading>
        {/*<Heading id="hendelser-modal-title" size="medium">*/}
        {/*  {corrId}*/}
        {/*</Heading>*/}
      </Modal.Header>
      <Modal.Body>
        <Box id="hendelser-modal-description">
          <Tabs defaultValue="request" size="small">
            <Tabs.List>
              <Tabs.Tab value="request" label="Request" />
              <Tabs.Tab value="response" label="Response" />
            </Tabs.List>

            <Tabs.Panel value="request">
              <Box className="mt-4">
                <h2 className="mb-3">Request Data</h2>
                {requestData ? (
                  <HStack gap="space-16" justify="space-around">
                    <VStack gap="space-8">
                      <Label size="small">Correlation ID:</Label>
                      <Detail>{requestData.corrId}</Detail>
                      <Label size="small">Organization:</Label>
                      <Detail>{requestData.orgId}</Detail>
                      <Label size="small">Domain:</Label>
                      <Detail>{requestData.domainName}</Detail>
                      <Label size="small">Package:</Label>
                      <Detail>{requestData.packageName}</Detail>
                    </VStack>
                    <VStack gap="space-8">
                      <Label size="small">Operation:</Label>
                      <Detail weight="semibold">
                        {renderOperationBadge(requestData.operationType)}
                      </Detail>
                      <Label size="small">Created:</Label>
                      <Detail>{formatTimestamp(requestData.created)}</Detail>
                      <Label size="small">Time to Live:</Label>
                      <Detail>{requestData.timeToLive}</Detail>
                    </VStack>
                  </HStack>
                ) : (
                  <p className="text-ax-neutral-600">
                    No request data available
                  </p>
                )}
              </Box>
              <Box className="mt-4">
                {requestData ? (
                  <>
                    <HStack
                      gap="space-16"
                      justify="space-between"
                      align="center"
                      className="mb-2"
                    >
                      <span className="font-medium text-ax-neutral-700">
                        Raw JSON:
                      </span>
                      <CopyButton
                        copyText={formatJson(requestData)}
                        size="small"
                        text="Kopier JSON"
                        activeText="Kopiert!"
                      />
                    </HStack>
                    <pre className={"novari-json-box"}>
                      {formatJson(requestData)}
                    </pre>
                  </>
                ) : (
                  <p className="text-ax-neutral-600">
                    No request data available
                  </p>
                )}
              </Box>
            </Tabs.Panel>

            <Tabs.Panel value="response">
              <Box className="mt-4">
                <h2 className="mb-3">Response Data</h2>
                {responseData ? (
                  <HStack gap="space-16" justify="space-around">
                    <VStack gap="space-8">
                      <Label size="small">Correlation ID:</Label>
                      <Detail className={"bg-ax-neutral-200  p-2"}>
                        {responseData.corrId}
                      </Detail>
                      <Label size="small">Adapter ID:</Label>
                      <Detail>{responseData.adapterId}</Detail>
                      <Label size="small">Organization:</Label>
                      <Detail>{responseData.orgId}</Detail>
                    </VStack>
                    <VStack gap="space-8">
                      <Label size="small">Status:</Label>
                      <Detail weight="semibold">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            !responseData.failed &&
                            !responseData.rejected &&
                            !responseData.conflicted
                              ? "bg-ax-success-200 text-ax-success-900"
                              : "bg-ax-danger-200 text-ax-danger-900"
                          }`}
                        >
                          {!responseData.failed &&
                          !responseData.rejected &&
                          !responseData.conflicted
                            ? "Success"
                            : "Failed"}
                        </span>
                      </Detail>
                      <Label size="small">Handled At:</Label>
                      <Detail>{formatTimestamp(responseData.handledAt)}</Detail>
                    </VStack>
                    <VStack gap="space-8">
                      {responseData.errorMessage && (
                        <Box className="col-span-2">
                          <span className="font-medium text-ax-neutral-700">
                            Error Message:
                          </span>
                          <Box className="mt-1 p-2 bg-ax-danger-100 border border-ax-danger-300 rounded text-ax-danger-900">
                            {responseData.errorMessage}
                          </Box>
                        </Box>
                      )}
                      {responseData.rejectReason && (
                        <Box className="col-span-2">
                          <span className="font-medium text-ax-neutral-700">
                            Reject Reason:
                          </span>
                          <Box className="mt-1 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800">
                            {responseData.rejectReason}
                          </Box>
                        </Box>
                      )}
                      {responseData.conflictReason && (
                        <Box className="col-span-2">
                          <span className="font-medium text-ax-neutral-700">
                            Conflict Reason:
                          </span>
                          <Box className="mt-1 p-2 bg-ax-warning-100 border border-ax-warning-300 rounded text-ax-warning-900">
                            {responseData.conflictReason}
                          </Box>
                        </Box>
                      )}
                    </VStack>
                    <Box className="mt-4">
                      <HStack
                        gap="space-16"
                        justify="space-between"
                        align="center"
                        className="mb-2"
                      >
                        <span className="font-medium text-ax-neutral-700">
                          Raw JSON:
                        </span>
                        <CopyButton
                          copyText={formatJson(responseData)}
                          size="small"
                          text="Kopier JSON"
                          activeText="Kopiert!"
                        />
                      </HStack>
                      <pre className={"novari-json-box"}>
                        {formatJson(responseData)}
                      </pre>
                    </Box>
                  </HStack>
                ) : (
                  <p className="text-ax-neutral-600">
                    No response data available
                  </p>
                )}
              </Box>
            </Tabs.Panel>
          </Tabs>
        </Box>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="tertiary" onClick={onClose}>
          Lukk
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
