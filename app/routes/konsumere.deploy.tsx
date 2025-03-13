import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { ConsumerApi } from "~/api/ConsumerApi";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const consumer = await request.json()

  try {
    return await ConsumerApi.deployConsumer(consumer)
  } catch (error: any) {
    return error("yes error");
  }
};
