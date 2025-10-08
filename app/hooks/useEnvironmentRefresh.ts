import { useEffect } from "react";
import { useRevalidator } from "react-router";

export function useEnvironmentRefresh() {
  const revalidate = useRevalidator();

  useEffect(() => {
    // Listen for environment changes
    const handleEnvironmentChange = () => {
      // Revalidate the current route's loader when environment changes
      revalidate.revalidate();
    };

    window.addEventListener("environmentChanged", handleEnvironmentChange);

    return () => {
      window.removeEventListener("environmentChanged", handleEnvironmentChange);
    };
  }, [revalidate]);
}
