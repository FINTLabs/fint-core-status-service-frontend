import process from "process";
import {IConsumerRequest} from "~/types/consumer/IConsumerRequest";

const PROFILE = process.env.PROFILE;
const CONSUMER_URL = process.env.METAMODEL_URL;

export class ConsumerApi {

  static async getExistingConsumers(): Promise<string[]> {
    const url = `${CONSUMER_URL}/consumer`

    console.log("AAAA")
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch resources: ${response.statusText}`);
    }

    const existingConsumers: IConsumerRequest[] = await response.json();
    return existingConsumers.map(consumer =>
      `${consumer.domain} ${consumer.package} ${consumer.org}`
    );
  }

}