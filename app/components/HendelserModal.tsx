import { Modal, Button, Heading, Tabs } from "@navikt/ds-react";

interface RequestData {
  corrId: string;
  orgId: string;
  domainName: string;
  packageName: string;
  resourceName: string;
  operationType: string;
  created: number;
  timeToLive: number;
}

interface ResponseData {
  corrId: string;
  orgId: string;
  adapterId: string;
  handledAt: number;
  operationType: string;
  failed: boolean;
  errorMessage: string | null;
  rejected: boolean;
  rejectReason: string | null;
  conflicted: boolean;
  conflictReason: string | null;
}

interface HendelserModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestData: RequestData | null;
  responseData: ResponseData | null;
  hendelseId: string;
}

export function HendelserModal({
  isOpen,
  onClose,
  requestData,
  responseData,
  hendelseId,
}: HendelserModalProps) {
  const formatTimestamp = (timestamp: number) => {
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
        <Heading id="hendelser-modal-title" size="medium">
          {hendelseId}
        </Heading>
      </Modal.Header>

      <Modal.Body>
        <div id="hendelser-modal-description">
          <Tabs defaultValue="request" size="small">
            <Tabs.List>
              <Tabs.Tab value="request" label="Request" />
              <Tabs.Tab value="response" label="Response" />
            </Tabs.List>

            <Tabs.Panel value="request">
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-3">Request Data</h3>
                {requestData ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Correlation ID:</span>
                        <div className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">
                          {requestData.corrId}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Created:</span>
                        <div className="mt-1">{formatTimestamp(requestData.created)}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Organization:</span>
                        <div className="mt-1">{requestData.orgId}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Operation:</span>
                        <div className="mt-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              requestData.operationType === "CREATE"
                                ? "bg-green-100 text-green-800"
                                : requestData.operationType === "UPDATE"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {requestData.operationType}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Domain:</span>
                        <div className="mt-1">{requestData.domainName}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Package:</span>
                        <div className="mt-1">{requestData.packageName}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Resource:</span>
                        <div className="mt-1">{requestData.resourceName}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Time to Live:</span>
                        <div className="mt-1">{requestData.timeToLive}</div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="font-medium text-gray-600">Raw JSON:</span>
                      <pre className="mt-2 p-4 bg-gray-50 border rounded-lg text-xs overflow-x-auto">
                        {formatJson(requestData)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No request data available</p>
                )}
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="response">
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-3">Response Data</h3>
                {responseData ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Correlation ID:</span>
                        <div className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">
                          {responseData.corrId}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Handled At:</span>
                        <div className="mt-1">{formatTimestamp(responseData.handledAt)}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Organization:</span>
                        <div className="mt-1">{responseData.orgId}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Status:</span>
                        <div className="mt-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              !responseData.failed &&
                              !responseData.rejected &&
                              !responseData.conflicted
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {!responseData.failed &&
                            !responseData.rejected &&
                            !responseData.conflicted
                              ? "Success"
                              : "Failed"}
                          </span>
                        </div>
                      </div>
                      {/* <div>
                        <span className="font-medium text-gray-600">Adapter ID:</span>
                        <div className="font-mono text-xs bg-gray-100 p-2 rounded mt-1">
                          {responseData.adapterId}
                        </div>
                      </div> */}
                      <div>
                        <span className="font-medium text-gray-600">Operation:</span>
                        <div className="mt-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              responseData.operationType === "CREATE"
                                ? "bg-green-100 text-green-800"
                                : responseData.operationType === "UPDATE"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {responseData.operationType}
                          </span>
                        </div>
                      </div>
                      {responseData.errorMessage && (
                        <div className="col-span-2">
                          <span className="font-medium text-gray-600">Error Message:</span>
                          <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded text-red-800">
                            {responseData.errorMessage}
                          </div>
                        </div>
                      )}
                      {responseData.rejectReason && (
                        <div className="col-span-2">
                          <span className="font-medium text-gray-600">Reject Reason:</span>
                          <div className="mt-1 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800">
                            {responseData.rejectReason}
                          </div>
                        </div>
                      )}
                      {responseData.conflictReason && (
                        <div className="col-span-2">
                          <span className="font-medium text-gray-600">Conflict Reason:</span>
                          <div className="mt-1 p-2 bg-orange-50 border border-orange-200 rounded text-orange-800">
                            {responseData.conflictReason}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-4">
                      <span className="font-medium text-gray-600">Raw JSON:</span>
                      <pre className="mt-2 p-4 bg-gray-50 border rounded-lg text-xs overflow-x-auto">
                        {formatJson(responseData)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No response data available</p>
                )}
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="tertiary" onClick={onClose}>
          Lukk
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
