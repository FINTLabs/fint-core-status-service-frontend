import { useState, useEffect } from "react";
import { getEnvironmentCookie, type Environment } from "~/utils/cookies";

export function useEnvironment() {
  const [environment, setEnvironment] = useState<Environment>("API");

  useEffect(() => {
    // Load environment from cookie on mount
    const currentEnvironment = getEnvironmentCookie();
    setEnvironment(currentEnvironment);

    // Listen for environment changes
    const handleEnvironmentChange = (event: CustomEvent) => {
      setEnvironment(event.detail.environment);
    };

    window.addEventListener("environmentChanged", handleEnvironmentChange as EventListener);

    return () => {
      window.removeEventListener("environmentChanged", handleEnvironmentChange as EventListener);
    };
  }, []);

  return environment;
}
