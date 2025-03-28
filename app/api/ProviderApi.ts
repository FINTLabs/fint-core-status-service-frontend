import {getResponse} from "~/api/shared/api";


export class ProviderApi {

  static async getProviderError(
    env: string,
  ): Promise<[IProviderException]> {
    const url = `error/provider`;

    return getResponse<[IProviderException]>(env, url);
  }
}