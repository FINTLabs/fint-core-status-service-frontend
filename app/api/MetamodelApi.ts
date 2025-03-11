import {IComponent} from "~/types/consumer/IComponent";
import process from "process";
import {IResource} from "~/types/consumer/IResource";
import {IMetamodelResponse} from "~/types/IMetamodelResponse";

const PROFILE = process.env.PROFILE;
const METAMODEL_URL = process.env.METAMODEL_URL;

export class MetamodelApi {

  static async getComponentResources(component: string): Promise<IResource[]> {
    const [domain, pkg] = component.split(" ")
    const url = `${METAMODEL_URL}/${domain}/${pkg}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch resources: ${response.statusText}`);
    }

    const metamodelData: IMetamodelResponse[] = await response.json();

    return metamodelData.map(item => ({
      name: item.resourceName,
      writeable: item.writeable,
      enabled: false,
      cacheDisabled: false
    }));
  }

}