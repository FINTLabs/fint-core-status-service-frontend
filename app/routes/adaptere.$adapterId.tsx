import type { Route } from "./+types/adaptere.$adapterId";
import { Box, Table, Alert, Heading, BodyShort, HStack } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, XMarkIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { useNavigate, useLocation } from "react-router";
import type { AdapterDetailData, AdaptereTableRow } from "../types";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Adapter Detaljer - ${params.adapterId} - Fint Core Status Service` },
    { name: "description", content: "View detailed adapter component status" },
  ];
}

export default function AdaptereDetail({ params }: Route.LoaderArgs) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the selected adapter data from navigation state
  const selectedAdapter = location.state?.selectedAdapter as AdaptereTableRow | undefined;
  
  // Sample data for the detailed view matching new API structure
  const componentData: AdapterDetailData[] = [
    {
      adapterId: "elev",
      heartbeat: true,
      delta: "2024-01-15",
      full: {
        healthy: false,
        date: "2024-01-10",
        expectedDate: "2024-01-20"
      }
    },
    {
      adapterId: "elevprogram",
      heartbeat: false,
      delta: "2024-01-12",
      full: {
        healthy: false,
        date: "2024-01-08",
        expectedDate: "2024-01-18"
      }
    },
    {
      adapterId: "timeplan",
      heartbeat: true,
      delta: "2024-01-16",
      full: {
        healthy: true,
        date: "2024-01-15",
        expectedDate: "2024-01-22"
      }
    }
  ];

  const handleRowClick = (component: typeof componentData[0]) => {
    // Navigate to table 3 using the correct route structure
    // Pass both the component data and selected adapter data via state
    navigate(`/adaptere/${params.adapterId}/${component.adapterId}`, {
      state: {
        selectedComponent: component,
        selectedAdapter: selectedAdapter
      }
    });
  };

  // Decode the adapter ID to get domain name
  const adapterId = params.adapterId;
  const domain = adapterId.charAt(0).toUpperCase() + adapterId.slice(1).replace(/-/g, ' ');

  // Create breadcrumb items
  const breadcrumbItems = [
    { label: "Adaptere", href: "/adaptere" },
    { label: domain, href: `/adaptere/${params.adapterId}` }
  ];

  return (
    <div className="py-8">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Adapter Detaljer</h1>
        <p className="text-xl text-gray-600">
          Komponenter for {domain}
        </p>
      </div>

      {/* Alert showing selected adapter details */}
      {selectedAdapter && (
        <Box marginBlock="4">
          <Alert variant={selectedAdapter.status === 'ok' ? 'success' : 'error'}>
            <Heading size="small" spacing>
              Valgt Adapter: {selectedAdapter.domain}
            </Heading>
            <HStack gap="space-16" wrap>
              <div className="space-y-1 flex-1 min-w-0">
                <BodyShort>
                  <strong>Organisasjon:</strong> {selectedAdapter.organisation}
                </BodyShort>
                <BodyShort>
                  <strong>Domene:</strong> {selectedAdapter.domain}
                </BodyShort>
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <BodyShort>
                  <strong>Status:</strong> 
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedAdapter.status === 'ok' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedAdapter.status === 'ok' ? 'Aktiv' : 'Inaktiv'}
                  </span>
                </BodyShort>
                <BodyShort>
                  <strong>Antall komponenter:</strong> {selectedAdapter.components.length}
                </BodyShort>
              </div>
            </HStack>
          </Alert>
        </Box>
      )}

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
              <Table.HeaderCell>Heartbeat</Table.HeaderCell>
              <Table.HeaderCell>Delta</Table.HeaderCell>
              <Table.HeaderCell>Full Status</Table.HeaderCell>
              <Table.HeaderCell>Full Date</Table.HeaderCell>
              <Table.HeaderCell>Expected Date</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {componentData.map((component, index) => (
              <Table.Row 
                key={index}
                onRowClick={() => handleRowClick(component)}
                shadeOnHover={true}
              >
                <Table.DataCell>
                  <span className="font-medium">{component.adapterId}</span>
                </Table.DataCell>
                <Table.DataCell>
                  {component.heartbeat ? (
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
                  <span className="text-gray-700">{component.delta}</span>
                </Table.DataCell>
                <Table.DataCell>
                  {component.full.healthy ? (
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
                  <span className="text-gray-700">{component.full.date}</span>
                </Table.DataCell>
                <Table.DataCell>
                  <span className="text-gray-700">{component.full.expectedDate}</span>
                </Table.DataCell>
                <Table.DataCell>
                  <ChevronRightIcon className="text-gray-400" fontSize="1rem" />
                </Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Box>
    </div>
  );
}
