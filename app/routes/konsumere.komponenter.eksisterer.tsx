import {ConsumerApi} from "~/api/ConsumerApi";

export const loader = async (): Promise<string[]> => {
  let componentResources;
  console.log("asdf")

  try {
    componentResources = ConsumerApi.getExistingConsumers();
  } catch (error) {
    console.error(error)
    componentResources = []
  }

  return componentResources
};
