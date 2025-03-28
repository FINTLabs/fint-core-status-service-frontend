import {LoaderFunction} from "@remix-run/node";
import {ProviderApi} from "~/api/ProviderApi";
import {Link, useLoaderData} from "@remix-run/react";
import {Table} from "@navikt/ds-react";

export const loader: LoaderFunction = async () => {
  const response = await ProviderApi.getProviderError("api")

  return new Response(JSON.stringify({ response:response }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export default function ProviderErrorTable(){

  const {provider} = useLoaderData<{provider:IProviderException[]}>()

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Name</Table.HeaderCell>
          <Table.HeaderCell scope="col">Message</Table.HeaderCell>
          <Table.HeaderCell scope="col">Antall feil</Table.HeaderCell>
          <Table.HeaderCell scope="col"/>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {provider.map((item: IProviderException, i: number) => {
          return (
            <Table.Row key={i}>
              <Table.HeaderCell scope="row">{item.name}</Table.HeaderCell>
              <Table.DataCell>{item.message}</Table.DataCell>
              <Table.DataCell>{item.stacktrace.length}</Table.DataCell>
              <Table.DataCell>
                <Link to={"/displayStackTrace"} state={item.stacktrace}>
                  Good luck
                </Link>
              </Table.DataCell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );

}

