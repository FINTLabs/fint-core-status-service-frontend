import {IResource, resourcesFromRequest} from "~/types/consumer/IResource";
import {IConsumerRequest} from "~/types/consumer/IConsumerRequest";

export interface IComponent {
  [key: string]: IResource[];
}

export function componentFromRequest(consumerRequest: IConsumerRequest): IComponent {
  return {
    [`${consumerRequest.domain} ${consumerRequest.package}`]: resourcesFromRequest(consumerRequest)
  }
}
