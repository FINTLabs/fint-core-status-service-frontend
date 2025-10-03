import { useEffect } from "react";
import { useRevalidator } from "react-router";

export function useEnvironmentRefresh() {
  const revalidator = useRevalidator();

  useEffect(() => {
    // Listen for environment changes
    const handleEnvironmentChange = () => {
      // Revalidate the current route's loader when environment changes
      revalidator.revalidate();
    };

    window.addEventListener('environmentChanged', handleEnvironmentChange);

    return () => {
      window.removeEventListener('environmentChanged', handleEnvironmentChange);
    };
  }, [revalidator]);
}
