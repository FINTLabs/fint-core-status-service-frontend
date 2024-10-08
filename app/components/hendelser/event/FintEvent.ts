interface FintEvent {
    corrId: string;
    ordId: string;
    hasError: boolean;
    requestEvent: RequestEvent | null;
    responseEvent: ResponseEvent | null;
}