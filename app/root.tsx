import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router";
import { Box, Page } from "@navikt/ds-react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

import type { Route } from "./+types/root";
import "./app.css";
import themeHref from "./styles/novari-theme.css?url";
import akselHref from "@navikt/ds-css?url";
import {
  ENVIRONMENT_COOKIE_NAME,
  parseEnvironmentFromCookieHeader,
  setEnvironmentCookie,
} from "~/utils/cookies";
import { AuthProperties } from "~/utils/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let server: any;

async function initializeMSW() {
  try {
    const enableMocking = import.meta.env.VITE_MOCK_CYPRESS === "true";

    if (enableMocking) {
      if (typeof window !== "undefined") {
        const { worker } = await import("../cypress/mocks/browser");
        await worker.start({
          serviceWorker: {
            url: "/mockServiceWorker.js",
          },
          onUnhandledRequest: "warn",
        });
        // console.log("[MSW] Worker started with handlers:", worker.listHandlers().length);
        // MSW worker started successfully
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__mswReady = true;
      } else {
        const { server: nodeServer } = await import("../cypress/mocks/node");
        server = nodeServer;
        server.listen({ onUnhandledRequest: "bypass" });
        // MSW server started successfully
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== "undefined") (window as any).__mswReady = true;
    }
  } catch {
    // MSW initialization failed - handle silently
    // console.warn("MSW initialization failed:", error);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined") (window as any).__mswReady = true;
  }
}

// Initialize MSW
initializeMSW();

export const links: Route.LinksFunction = () => [
  // { rel: "preconnect", href: "https://fonts.googleapis.com" },
  // {
  //   rel: "preconnect",
  //   href: "https://fonts.gstatic.com",
  //   crossOrigin: "anonymous",
  // },
  // {
  //   rel: "stylesheet",
  //   href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  // },
  {
    rel: "stylesheet",
    href: themeHref,
  },
  {
    rel: "stylesheet",
    href: akselHref,
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Set auth properties from request
  AuthProperties.setProperties(request);

  const cookieHeader = request.headers.get("Cookie");
  const cookieValue = parseEnvironmentFromCookieHeader(cookieHeader);

  if (!cookieValue) {
    setEnvironmentCookie("API");
    return data(
      { cookieValue },
      {
        headers: {
          "Set-Cookie": `${ENVIRONMENT_COOKIE_NAME}=API; path=/; SameSite=Lax`,
        },
      }
    );
  }

  return new Response(JSON.stringify({ selectedEnv: cookieValue }), {
    headers: { "Content-Type": "application/json" },
  });
};

//TODO: add logging and clean eslint errors

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Status</title>
      </head>
      <body data-theme="novari">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { selectedEnv } = useLoaderData<{
    selectedEnv: string;
  }>();

  return (
    <Page
      footer={
        <Box padding="1" as="footer" className={"novari-footer"}>
          <Page.Block>
            <Footer />
          </Page.Block>
        </Box>
      }
    >
      <Box background={"bg-default"} as="nav" data-cy="novari-header">
        <Header />
      </Box>

      <Box padding="8" paddingBlock="2" as="main">
        <Page.Block gutters width="2xl">
          <Outlet context={selectedEnv} />
        </Page.Block>
      </Box>
    </Page>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
  }

  return (
    <Page>
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <div className="py-8">
          <h1 className="text-3xl font-bold mb-4">{message}</h1>
          <p className="text-lg mb-4">{details}</p>
        </div>
      </Page.Block>
      <Footer />
    </Page>
  );
}
