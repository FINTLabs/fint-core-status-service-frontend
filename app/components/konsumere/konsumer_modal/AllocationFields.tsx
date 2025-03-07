import {CpuUnit, IConsumer, MemoryUnit} from "~/types/IConsumer";
import {VStack} from "@navikt/ds-react";
import Allocation from "~/components/konsumere/Allocation";

interface AllocationFieldsProps {
  consumer: IConsumer;
  setConsumer: React.Dispatch<React.SetStateAction<IConsumer>>;
}

export default function AllocationFields({consumer, setConsumer}: AllocationFieldsProps) {
  const memoryTypes: MemoryUnit[] = ["Mi", "Gi"];
  const cpuTypes: CpuUnit[] = ["mm", "core"];

  const handleAllocationChange = (
    allocationType: "memory" | "cpu",
    field: "request" | "limit",
    value: string
  ) => {
    setConsumer(prev => ({
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
    setConsumer(prev => ({
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

  return (
    <VStack>
      <Allocation<MemoryUnit>
        type="memory"
        allocation={consumer.allocations.memory}
        types={memoryTypes}
        onChange={(field, value) => handleAllocationChange("memory", field, value)}
        onSelect={(field, value) => handleAllocationSelect("memory", field, value)}
      />
      <Allocation<CpuUnit>
        type="cpu"
        allocation={consumer.allocations.cpu}
        types={cpuTypes}
        onChange={(field, value) => handleAllocationChange("cpu", field, value)}
        onSelect={(field, value) => handleAllocationSelect("cpu", field, value)}
      />
    </VStack>
  );
}
