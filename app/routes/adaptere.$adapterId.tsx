import type { Route } from "./+types/adaptere.$adapterId";
import { Box, Table } from "@navikt/ds-react";
import { CheckmarkCircleFillIcon, XMarkIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { useNavigate } from "react-router";
import type { AdapterDetailData } from "../types";
import { Breadcrumbs } from "../components/Breadcrumbs";

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Adapter Detaljer - ${params.adapterId} - Fint Core Status Service` },
    { name: "description", content: "View detailed adapter component status" },
  ];
}

export default function AdaptereDetail({ params }: Route.LoaderArgs) {
  const navigate = useNavigate();
  
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
    navigate(`/adaptere/${params.adapterId}/${component.adapterId}`);
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
