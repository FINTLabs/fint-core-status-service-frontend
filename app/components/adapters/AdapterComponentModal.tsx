import { Modal, Button, Heading, Tabs, Tag, Loader } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, XMarkIcon } from "@navikt/aksel-icons";
import type { IAdapterComponentModalData } from "~/types";

interface AdapterComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: IAdapterComponentModalData | null;
  adapterName: string;
  loading?: boolean;
}

export function AdapterComponentModal({
  isOpen,
  onClose,
  data,
  adapterName,
  loading = false,
}: AdapterComponentModalProps) {
  const formatTimestamp = (timestamp: number | null) => {
    if (timestamp === null || timestamp === 0) return "Never";
    return new Date(timestamp * 1000).toLocaleString("no-NO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getSyncIntervalColor = (interval: string) => {
    switch (interval) {
      case "IMMEDIATE":
        return "bg-green-100 text-green-800";
      case "HOURLY":
        return "bg-blue-100 text-blue-800";
      case "DAILY":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="adapter-component-modal-title"
      aria-describedby="adapter-component-modal-description"
      placement="top"
      data-cy="component-modal"
    >
      <Modal.Header>
        <Heading id="adapter-component-modal-title" size="medium">
          Adapter Komponent: {adapterName}
        </Heading>
      </Modal.Header>

      <Modal.Body>
        <div id="adapter-component-modal-description">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader size="large" title="Laster adapter data..." />
            </div>
          ) : (
            <Tabs defaultValue="overview" size="small">
              <Tabs.List>
                <Tabs.Tab value="overview" label="Oversikt" />
                <Tabs.Tab value="capabilities" label="Kapabiliteter" />
              </Tabs.List>

              <Tabs.Panel value="overview">
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-3">Adapter Konfigurasjon</h3>
                  {data ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Adapter ID:</span>
                          <div className="font-mono text-xs bg-gray-100 p-2 rounded mt-1 break-all">
                            {data.adapterId}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Brukernavn:</span>
                          <div className="mt-1">{data.username}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Organisasjon:</span>
                          <div className="mt-1">{data.orgId}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Heartbeat Intervall:</span>
                          <div className="mt-1">{data.heartbeatIntervalInMinutes} minutter</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Siste Heartbeat:</span>
                          <div className="mt-1">{formatTimestamp(data.lastHeartbeat)}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Siste Aktivitet:</span>
                          <div className="mt-1">{formatTimestamp(data.lastActivity)}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Har Kontakt:</span>
                          <div className="mt-1">
                            {data.hasContact ? (
                              <div className="inline-flex items-center">
                                <CheckmarkCircleFillIcon
                                  className="text-green-600 mr-1"
                                  fontSize="1rem"
                                />
                                <span className="text-green-800">Ja</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center">
                                <XMarkIcon className="text-red-600 mr-1" fontSize="1rem" />
                                <span className="text-red-800">Nei</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Komponenter:</span>
                          <div className="mt-1">
                            {data.components.map((component, index) => (
                              <span
                                key={index}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                              >
                                {component}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-md font-semibold mb-2">
                          Kapabiliteter ({data.capabilities.length})
                        </h4>
                        <div className="space-y-2">
                          {data.capabilities.map((capability, index) => (
                            <div key={index} className="border rounded-lg p-3 bg-gray-50">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{capability.resourceName}</span>
                                <div className="flex items-center space-x-2">
                                  <Tag variant="info" size="small">
                                    {capability.deltaSyncInterval}
                                  </Tag>
                                  {capability.followsContract ? (
                                    <CheckmarkCircleFillIcon
                                      className="text-green-600"
                                      fontSize="1rem"
                                      title="Følger kontrakt"
                                    />
                                  ) : (
                                    <XMarkIcon
                                      className="text-red-600"
                                      fontSize="1rem"
                                      title="Følger ikke kontrakt"
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="text-xs text-gray-600 grid grid-cols-2 gap-2">
                                <div>
                                  Full sync intervall: {capability.fullSyncIntervalInDays} dager
                                </div>
                                <div>Siste full sync: {capability.lastFullSyncTime || "Never"}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">Ingen adapter data tilgjengelig</p>
                  )}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="capabilities">
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-3">Detaljert Kapabiliteter</h3>
                  {data && data.capabilities.length > 0 ? (
                    <div className="space-y-4">
                      {data.capabilities.map((capability, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-md font-semibold">{capability.resourceName}</h4>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSyncIntervalColor(capability.deltaSyncInterval)}`}
                              >
                                {capability.deltaSyncInterval}
                              </span>
                              {capability.followsContract ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <CheckmarkCircleFillIcon className="mr-1" fontSize="0.75rem" />
                                  Følger kontrakt
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  <XMarkIcon className="mr-1" fontSize="0.75rem" />
                                  Følger ikke kontrakt
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-600">
                                Full Sync Intervall:
                              </span>
                              <div className="mt-1">{capability.fullSyncIntervalInDays} dager</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">
                                Delta Sync Intervall:
                              </span>
                              <div className="mt-1">{capability.deltaSyncInterval}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">Siste Full Sync:</span>
                              <div className="mt-1">{capability.lastFullSyncTime || "Never"}</div>
                            </div>
                            <div>
                              <span className="font-medium text-gray-600">
                                Siste Full Sync (Timestamp):
                              </span>
                              <div className="mt-1 font-mono text-xs">
                                {capability.lastFullSync || "null"}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Ingen kapabiliteter tilgjengelig</p>
                  )}
                </div>
              </Tabs.Panel>
            </Tabs>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="tertiary" onClick={onClose} data-cy="component-modal-close">
          Lukk
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
