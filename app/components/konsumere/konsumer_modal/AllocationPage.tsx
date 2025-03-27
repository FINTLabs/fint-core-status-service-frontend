import { HStack, VStack } from "@navikt/ds-react";
import Allocation from "~/components/konsumere/Allocation";
import { IConsumer } from "~/types/consumer/IConsumer";
import {
  CpuUnit,
  cpuUnits,
  MemoryUnit,
  memoryUnits,
} from "~/types/consumer/IAllocation";

interface AllocationFieldsProps {
  consumer: IConsumer;
  setConsumer: React.Dispatch<React.SetStateAction<IConsumer>>;
}

export default function AllocationPage({
  consumer,
  setConsumer,
}: AllocationFieldsProps) {
  const handleAllocationChange = (
    allocationType: "memory" | "cpu",
    field: "request" | "limit",
    value: string
  ) => {
    setConsumer((prev) => ({
      ...prev,
      allocations: {
        ...prev.allocations,
        [allocationType]: {
          ...prev.allocations[allocationType],
          [field]: value,
        },
      },
    }));
  };

  const handleAllocationSelect = <T extends string>(
    allocationType: "memory" | "cpu",
    field: "request" | "limit",
    value: T
  ) => {
    setConsumer((prev) => ({
      ...prev,
      allocations: {
        ...prev.allocations,
        [allocationType]: {
          ...prev.allocations[allocationType],
          [field === "request" ? "requestType" : "limitType"]: value,
        },
      },
    }));
  };

  //TODO: types ? are you trying to set one of two sets?
  return (
    <VStack>
      <HStack justify="center">
        <Allocation
          type="memory"
          allocation={consumer.allocations.memory}
          types={memoryUnits}
          onChange={(field, value) =>
            handleAllocationChange("memory", field, value)
          }
          onSelect={(field, value) =>
            handleAllocationSelect("memory", field, value)
          }
        />
      </HStack>
      <HStack justify="center">
        <Allocation
          type="cpu"
          allocation={consumer.allocations.cpu}
          types={cpuUnits}
          onChange={(field, value) =>
            handleAllocationChange("cpu", field, value)
          }
          onSelect={(field, value) =>
            handleAllocationSelect("cpu", field, value)
          }
        />
      </HStack>
    </VStack>
  );
}
