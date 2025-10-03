import type { Route } from "./+types/adaptere.$adapterId.$componentId";
import { Box, Table } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, XMarkIcon } from "@navikt/aksel-icons";
import { useState } from "react";
import type { AdapterComponentData } from "../types";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { AdapterComponentModal } from "../components/AdapterComponentModal";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Adapter Komponent - ${params.componentId} - Fint Core Status Service` },
    { name: "description", content: "View detailed adapter component information" },
  ];
}

export default function AdapterComponent({ params }: Route.LoaderArgs) {
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdapter, setSelectedAdapter] = useState<string | null>(null);

  // Sample data for the adapter component view
  const adapterData: AdapterComponentData[] = [
    {
      adapter: "elevprogram-visma",
      driftspuls: "feil",
      deltaOverføring: "",
      fullOverføring: ""
    },
    {
      adapter: "elevprogram-visma2",
      driftspuls: "ok",
      deltaOverføring: "I dag",
      fullOverføring: "Lørdag"
    },
    {
      adapter: "elevprogram-dev",
      driftspuls: "feil",
      deltaOverføring: "15.03.2024",
      fullOverføring: "15.03.2024"
    }
  ];

  // Decode the component ID to get adapter and component info
  const adapterId = params.adapterId;
  const componentName = params.componentId;
  const domain = adapterId.charAt(0).toUpperCase() + adapterId.slice(1).replace(/-/g, ' ');

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: "Adaptere", href: "/adaptere" },
    { label: domain, href: `/adaptere/${adapterId}` },
    { label: componentName, href: `/adaptere/${adapterId}/${componentName}` }
  ];

  // Modal handlers
  const handleRowClick = (adapterName: string) => {
    setSelectedAdapter(adapterName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAdapter(null);
  };

  // Generate sample adapter component data
  const generateAdapterComponentData = (adapterName: string) => {
    return {
      adapterId: `https://vigoiks.no/${params.adapterId}-no/${componentName}`,
      username: `${componentName}-adapter-credentials-fmloj@adapter.${params.adapterId}.no`,
      orgId: `${params.adapterId}.no`,
      heartbeatIntervalInMinutes: 1,
      lastHeartbeat: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400), // Random time within last day (Unix timestamp)
      components: [`${componentName}.${adapterName}`],
      hasContact: Math.random() > 0.3, // 70% chance of having contact
      lastActivity: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 3600), // Random time within last hour
      capabilities: [
        {
          resourceName: "behandling",
          fullSyncIntervalInDays: 1,
          deltaSyncInterval: "IMMEDIATE",
          followsContract: false,
          lastFullSync: null,
          lastFullSyncTime: null
        },
        {
          resourceName: "samtykke",
          fullSyncIntervalInDays: 1,
          deltaSyncInterval: "IMMEDIATE",
          followsContract: false,
          lastFullSync: null,
          lastFullSyncTime: null
        },
        {
          resourceName: "tjeneste",
          fullSyncIntervalInDays: 1,
          deltaSyncInterval: "IMMEDIATE",
          followsContract: Math.random() > 0.2, // 80% chance
          lastFullSync: Math.random() > 0.5 ? Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400) : null,
          lastFullSyncTime: Math.random() > 0.5 ? new Date((Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400)) * 1000).toLocaleString('no-NO') : null
        }
      ]
    };
  };

  return (
    <div className="py-8">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Adapter Komponent</h1>
        <p className="text-xl text-gray-600">
          {componentName} for {domain}
        </p>
      </div>

      <Box
        background="surface-subtle"
        padding="space-16"
        borderRadius="large"
        shadow="xsmall"
      >
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Adapter</Table.HeaderCell>
              <Table.HeaderCell>Driftspuls</Table.HeaderCell>
              <Table.HeaderCell>Delta overføring</Table.HeaderCell>
              <Table.HeaderCell>Full overføring</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {adapterData.map((adapter, index) => (
              <Table.Row 
                key={index}
                onRowClick={() => handleRowClick(adapter.adapter)}
                shadeOnHover={true}
              >
                <Table.DataCell>
                  <span className="font-medium">{adapter.adapter}</span>
                </Table.DataCell>
                <Table.DataCell>
                  {adapter.driftspuls === 'ok' ? (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-md">
                      <CheckmarkCircleFillIcon className="text-green-600" title="OK" fontSize="1.25rem" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-md">
                      <XMarkIcon className="text-red-600" title="Error" fontSize="1.25rem" />
                    </div>
                  )}
                </Table.DataCell>
                <Table.DataCell>
                  <span className="text-gray-700">{adapter.deltaOverføring || '-'}</span>
                </Table.DataCell>
                <Table.DataCell>
                  <span className="text-gray-700">{adapter.fullOverføring || '-'}</span>
                </Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Box>

      {/* Modal */}
      {selectedAdapter && (
        <AdapterComponentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={generateAdapterComponentData(selectedAdapter)}
          adapterName={selectedAdapter}
        />
      )}
    </div>
  );
}
