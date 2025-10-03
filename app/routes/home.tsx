import type { Route } from "./+types/home";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Fint Core Status Service" },
    { name: "description", content: "Monitor the status of Fint Core services" },
  ];
}

export default function Home() {
  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Fint Core Status Service</h1>
        <p className="text-xl text-gray-600">
          Monitor and track the health and status of Fint Core services in real-time.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-2">Service Status</h2>
          <p className="text-gray-600">View the current status of all Fint Core services.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-2">Health Checks</h2>
          <p className="text-gray-600">Monitor health checks and service availability.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <h2 className="text-xl font-semibold mb-2">Performance Metrics</h2>
          <p className="text-gray-600">Track performance and response times.</p>
        </div>
      </div>
    </div>
  );
}
