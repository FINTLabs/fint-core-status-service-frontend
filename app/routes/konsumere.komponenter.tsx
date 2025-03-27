import { IComponent } from "~/types/consumer/IComponent";
import { MetamodelApi } from "~/api/MetamodelApi";
import { LoaderFunctionArgs } from "@remix-run/router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const components = url.searchParams.getAll("components");
  const componentResources: IComponent = {};

  await Promise.all(
    components.map(async (component) => {
      try {
        componentResources[component] =
          await MetamodelApi.getComponentResources(component);
      } catch (error) {
        console.error(
          `Error fetching resources for component ${component}:`,
          error
        );
        componentResources[component] = [];
      }
    })
  );

  console.log(componentResources);
  return componentResources;
};
