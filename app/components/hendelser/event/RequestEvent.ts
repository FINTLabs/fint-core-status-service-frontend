interface RequestEvent {
    corrId: string;
    orgId: string;
    domainName: string;
    packageName: string;
    resourceName: string;
    operationType: OperationType;
    created: number;
    timeToLive: number;
}