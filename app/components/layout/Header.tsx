import { useNavigate } from "react-router";
import { Page } from "@navikt/ds-react";
import { NovariHeader } from "novari-frontend-components";
import { EnvironmentSelector } from "../common/EnvironmentSelector";

export function Header() {
  const navigate = useNavigate();

  const headerProps = {
    appName: "Fint Core Status Service",
    menu: [
      {
        label: "Dashboard",
        description: "Oversikt over alle tilgjengelige tjenester",
        displayBox: false,
        action: "/",
      },
      {
        label: "Adaptere",
        description: "Oversikt over alle tilgjengelige adaptere",
        displayBox: false,
        action: "/adaptere",
      },
      {
        label: "Hendelser",
        description: "Oversikt over hendelser og operasjoner",
        displayBox: false,
        action: "/hendelser",
      },
    ],
    isLoggedIn: true,
    onLogout: () => {},
    onLogin: () => {},
    onMenuClick: (action: string) => navigate(action),
    user: null,
    logo: null,
  };

  return (
    <Page.Block as="header">
      <NovariHeader {...headerProps}>
        <EnvironmentSelector />
      </NovariHeader>
    </Page.Block>
  );
}
