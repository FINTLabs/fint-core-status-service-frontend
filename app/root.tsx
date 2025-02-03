import {Links, Meta, MetaFunction, Outlet, Scripts, ScrollRestoration, useLoaderData,} from "@remix-run/react";
import "./tailwind.css";
import "@navikt/ds-css";
import Header from "~/components/root/Header";
import {HStack, Page, VStack} from "@navikt/ds-react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {HeaderProperties} from "~/components/root/HeaderProperties";
import {envCookie} from "~/components/cookie";
import {ActionFunction, json} from "@remix-run/node";
import {EnvProvider, useEnv} from "~/constants/envContext";

export const loader = async ({request}: LoaderFunctionArgs) => {
  HeaderProperties.setProperties(request);
  const cookieHeader = request.headers.get("Cookie");
  let selectedEnv = await envCookie.parse(cookieHeader);
  if (!selectedEnv) {
    selectedEnv = "api";
    const newCookieHeader = await envCookie.serialize(selectedEnv);
    return json(
      {selectedEnv},
      {
        headers: {
          "Set-Cookie": newCookieHeader,
        },
      }
    );
  }
  return json({selectedEnv});
};

export const meta: MetaFunction = () => {
  return [
    { title: 'Core Status' }
  ]
}

export function Layout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Meta/>
      <Links/>
    </head>
    <body>
    <HStack justify="center" className="h-screen">
      <VStack gap="4" justify="center" className="w-3/4 h-full">
        {children}
      </VStack>
    </HStack>
    <ScrollRestoration/>
    <Scripts/>
    </body>
    </html>
  );
}

export default function App() {
  const { selectedEnv } = useLoaderData<{ selectedEnv: string }>();

  return (
      <EnvProvider initialEnv={selectedEnv}>
        <MainApp />
      </EnvProvider>
  );
}

function MainApp() {
  const { selectedEnv, setEnv } = useEnv();

  return (
        <Page >
          <Header onHeaderChange={setEnv} value={selectedEnv} />
          <Page.Block as={"main"} className="flex flex-col px-4 pb-6">
            <Outlet />
          </Page.Block>
        </Page>
  );
}

export const action: ActionFunction = async ({request}) => {
  const formdata = await request.formData();
  const environment = formdata.get("env") as string;

  if (environment) {
    console.log("environment:", environment);
    const newCookieHeader = await envCookie.serialize(environment);
    return json(
      {environment},
      {
        headers: {
          "Set-Cookie": newCookieHeader,
        },
      }
    );
  }
  return json({ok: true});
};
