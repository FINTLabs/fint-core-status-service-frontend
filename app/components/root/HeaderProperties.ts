export class HeaderProperties {
  static bearerToken: string = '';

  static setProperties(request: Request) {
    HeaderProperties.bearerToken = request.headers.get('Authorization') || '';
  }

  static getBearerToken() {
    return HeaderProperties.bearerToken;
  }

}
