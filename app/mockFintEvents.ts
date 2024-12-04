import { OperationType, FintEvent, RequestFintEvent, ResponseFintEvent, SyncPageEntry } from 'app/types/Event';

// Dummy SyncPageEntry
const mockSyncPageEntry: SyncPageEntry = {
  identifier: "1234-5678-91011"
};

// Dummy RequestFintEvent
const mockRequestFintEvent: RequestFintEvent = {
  corrId: "abcd-efgh-ijkl",
  orgId: "org-12345",
  domainName: "example.com",
  packageName: "testPackage",
  resourceName: "resourceName",
  operationType: OperationType.CREATE,
  created: Date.now(),
  timeToLive: 3600, // 1 time
};

const mockFintEvents: FintEvent[] = [
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-2",
    orgId: "org-54321",
    hasError: true,
    requestEvent: {
      corrId: "req-2",
      orgId: "org-54321",
      domainName: "another-example.com",
      packageName: "testPackage2",
      resourceName: "resource2",
      operationType: OperationType.DELETE,
      created: Date.now() - 2000000,
      timeToLive: 3600,
    },
    responseEvent: {
      corrId: "res-2",
      orgId: "org-54321",
      adapterId: "adapter-456",
      handledAt: Date.now() - 1000000,
      value: { identifier: "91011-1234-5678" },
      operationType: OperationType.DELETE,
      failed: true,
      errorMessage: "Failed to delete resource",
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-3",
    orgId: "fintlabs.no",
    hasError: true,
    requestEvent: {
      corrId: "req-3",
      orgId: "org-54321",
      domainName: "another-example.com",
      packageName: "testPackage3",
      resourceName: "resource3",
      operationType: OperationType.DELETE,
      created: Date.now() - 2000000,
      timeToLive: 3600,
    }
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },{
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  },
  {
    corrId: "event-1",
    orgId: "org-12345",
    hasError: false,
    requestEvent: {
      corrId: "req-1",
      orgId: "org-12345",
      domainName: "example.com",
      packageName: "testPackage1",
      resourceName: "resource1",
      operationType: OperationType.UPDATE,
      created: Date.now() - 1000000,
      timeToLive: 7200,
    },
    responseEvent: {
      corrId: "res-1",
      orgId: "org-12345",
      adapterId: "adapter-123",
      handledAt: Date.now() - 500000,
      value: { identifier: "5678-91011-1234" },
      operationType: OperationType.UPDATE,
      failed: false,
      errorMessage: null,
      rejected: false,
      rejectReason: null,
    },
  }, {
      corrId: "event-1",
      orgId: "org-12345",
      hasError: false,
      requestEvent: {
        corrId: "req-1",
        orgId: "org-12345",
        domainName: "example.com",
        packageName: "testPackage1",
        resourceName: "resource1",
        operationType: OperationType.UPDATE,
        created: Date.now() - 1000000,
        timeToLive: 7200,
      },
      responseEvent: {
        corrId: "res-1",
        orgId: "org-12345",
        adapterId: "adapter-123",
        handledAt: Date.now() - 500000,
        value: { identifier: "5678-91011-1234" },
        operationType: OperationType.UPDATE,
        failed: false,
        errorMessage: null,
        rejected: false,
        rejectReason: null,
      },
    },


];

export default mockFintEvents;