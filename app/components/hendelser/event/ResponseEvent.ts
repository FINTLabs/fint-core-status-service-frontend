interface ResponseEvent{
    corrId: string;
    orgId: string;
    adapterId: string;
    handledAt: number;
    value: SyncPageEntry;
    operationType: OperationType;
    failed: boolean;
    errorMessage: string;
    rejected: boolean;
    rejectReson: string;
}