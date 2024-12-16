import {Links, Meta, Outlet, Scripts, ScrollRestoration, useFetcher, useLoaderData,} from "@remix-run/react";
import "./tailwind.css";
import "@navikt/ds-css";
import Header from "~/components/root/Header";
import {Box, HStack, VStack} from "@navikt/ds-react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {HeaderProperties} from "~/components/root/HeaderProperties";
import {envCookie} from "~/components/cookie";
import {ActionFunction, json} from "@remix-run/node";

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
  const {selectedEnv} = useLoaderData<{ selectedEnv: string }>();
  const fetcher = useFetcher();

  function setEnv(env: string) {
    const formData = new FormData();
    formData.append("env", env);
    fetcher.submit(formData, {method: "POST"});
  }

  return (
    <>
      <Header onHeaderChange={setEnv} value={selectedEnv}/>
      <Box
        shadow="small"
        borderRadius="xlarge"
        margin="0 0 4 0"
        padding="4"
        className="flex-grow w-full px-4 py-6"
      >
        <Outlet/>
      </Box>
    </>
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
