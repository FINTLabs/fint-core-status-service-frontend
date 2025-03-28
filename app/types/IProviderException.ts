interface IProviderException {
  name: string;
  message: string | null;
  stacktrace: IStacktraceElement[];
}

interface IStacktraceElement {
  classLoaderName: string | null;
  moduleName: string | null;
  moduleVersion: string | null;
  methodName: string;
  fileName: string;
  lineNumber: number;
  className: string;
  nativeMethod: boolean;
}
