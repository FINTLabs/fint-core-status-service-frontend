import type {ActionFunction} from "@remix-run/node";
import {ConsumerApi} from "~/api/ConsumerApi";
import {IConsumer} from "~/types/consumer/IConsumer";

interface IndividualDeployResponse {
  success: boolean;
  status: number;
  consumer?: IConsumer;
}

export interface DeployResponse {
  responses: IndividualDeployResponse[];
}

export const action: ActionFunction = async ({request}): Promise<DeployResponse> => {
  const formData = await request.formData();
  const consumer: IConsumer = JSON.parse(formData.get("consumer") as string);
  const responses = await ConsumerApi.deployConsumer(consumer);

  const responsesMapped: IndividualDeployResponse[] = await Promise.all(
    responses.map(async (response) => {
      if (response.ok) {
        const consumerData = await response.json() as IConsumer;
        return {
          success: true,
          status: response.status,
          consumer: consumerData,
        };
      } else {
        return {
          success: false,
          status: response.status,
        };
      }
    })
  );

  return {responses: responsesMapped};
};