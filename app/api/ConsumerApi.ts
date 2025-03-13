import process from "process";
import {fromConsumerToRequests, IConsumerRequest} from "~/types/consumer/IConsumerRequest";
import {IConsumer} from "~/types/consumer/IConsumer";

const PROFILE = process.env.PROFILE;
const CONSUMER_URL = process.env.CONSUMER_URL;

export class ConsumerApi {

  static async getExistingConsumers(): Promise<string[]> {
    const url = `${CONSUMER_URL}/consumer`

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch resources: ${response.statusText}`);
    }

    const existingConsumers: IConsumerRequest[] = await response.json();
    return existingConsumers.map(consumer =>
      `${consumer.domain} ${consumer.package} ${consumer.org}`
    );
  }

  static async deploy(consumerRequest: IConsumerRequest): Promise<Response> {
    const url = `${CONSUMER_URL}/consumer`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(consumerRequest)
    });

    if (!response.ok) {
      throw new Error(`Deployment failed: ${response.statusText}`);
    }

    return response;
  }

  static async deployConsumer(consumer: IConsumer): Promise<void> {
    await Promise.all(
      fromConsumerToRequests(consumer).map(c => this.deploy(c))
    )
  }

}