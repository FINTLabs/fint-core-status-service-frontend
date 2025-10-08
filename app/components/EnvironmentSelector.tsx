import { Select } from "@navikt/ds-react";
import { useState, useEffect } from "react";
import { getEnvironmentCookie, setEnvironmentCookie, type Environment } from "~/utils/cookies";

export function EnvironmentSelector() {
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment>("API");

  useEffect(() => {
    // Load environment from cookie on component mount
    const environment = getEnvironmentCookie();
    setSelectedEnvironment(environment);

    // If no cookie exists, set the default API cookie
    if (!document.cookie.includes("environment=")) {
      setEnvironmentCookie("API");
    }
  }, []);

  const handleEnvironmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newEnvironment = event.target.value as Environment;
    setSelectedEnvironment(newEnvironment);
    setEnvironmentCookie(newEnvironment);

    // Dispatch a custom event to notify other parts of the app about the environment change
    window.dispatchEvent(
      new CustomEvent("environmentChanged", {
        detail: { environment: newEnvironment },
      })
    );
  };

  return (
    <Select
      value={selectedEnvironment}
      onChange={handleEnvironmentChange}
      size="small"
      label="Environment"
      hideLabel
    >
      <option value="API">API</option>
      <option value="BETA">BETA</option>
      <option value="ALPHA">ALPHA</option>
    </Select>
  );
}
