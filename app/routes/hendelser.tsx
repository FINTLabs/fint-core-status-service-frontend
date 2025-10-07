import { HendelserPage } from "~/components/HendelserPage";
import type { HendelserData } from "~/types";
import { useLoaderData, type LoaderFunction } from "react-router";
import HendelserApi from "~/routes/api/HendelserApi";
import { parseEnvironmentFromCookieHeader } from "~/utils/cookies";
import { useEnvironmentRefresh } from "~/hooks/useEnvironmentRefresh";

export function meta() {
  return [
    { title: "Hendelser - Fint Core Status Service" },
    { name: "description", content: "View event logs and operations" },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  // console.log('request', request);
  const cookieHeader = request.headers.get('Cookie');
  const env = parseEnvironmentFromCookieHeader(cookieHeader);
  // console.log('env', env);
  
  const response = await HendelserApi.getAllHendelser();
  // Extract the data from the ApiResponse wrapper
  const hendelserData = response.data || [];
  return { hendelserData, env };
};

export default function Hendelser() {
  const { hendelserData, env } = useLoaderData() as { hendelserData: HendelserData[], env: string  };
  useEnvironmentRefresh(); // This will revalidate when environment changes

  return <HendelserPage initialData={hendelserData} env={env} />;
}
