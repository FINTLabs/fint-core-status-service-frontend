import {Links, Meta, Outlet, Scripts, ScrollRestoration,} from "@remix-run/react";
import "./tailwind.css";
import "@navikt/ds-css"
import Header from "~/components/root/Header";
import {Box, HStack, VStack} from "@navikt/ds-react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {HeaderProperties} from "~/components/root/HeaderProperties";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  HeaderProperties.setProperties(request);
  return null
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
      <VStack gap='4' justify="center" className="w-3/4 h-full">
        <Header/>
        <Box shadow='small' borderRadius='xlarge' margin='0 0 4 0' padding='4' className="flex-grow w-full px-4 py-6">
          {children}
          <ScrollRestoration/>
          <Scripts/>
        </Box>
      </VStack>
    </HStack>
    </body>
    </html>
  );
}

export default function App() {
  return <Outlet/>;
}
