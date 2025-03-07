import {Box, HStack, Select, TextField, Tooltip} from "@navikt/ds-react";
import {IAllocation} from "~/types/IConsumer";

interface AllocationProps<T extends string> {
  type: "memory" | "cpu";
  allocation: IAllocation<T>;
  types: T[];
  onChange: (field: "request" | "limit", value: string) => void;
  onSelect: (field: "request" | "limit", value: T) => void;
}

export default function Allocation<T extends string>({
                                                       type,
                                                       allocation,
                                                       types,
                                                       onChange,
                                                       onSelect,
                                                     }: AllocationProps<T>) {
  return (
    <HStack justify="center">
      <Box borderRadius="medium" className="p-2 flex w-fit">
        <HStack gap="2">
          <HStack gap="1">
            <Tooltip content={`${type} request`}>
              <TextField
                placeholder="request"
                hideLabel
                label={`${type} request`}
                className="w-32"
                value={allocation.request}
                onChange={(e) => onChange("request", e.target.value)}
              />
            </Tooltip>
            <Select
              label={`${type} request type`}
              hideLabel
              className="w-20"
              value={allocation.requestType}
              onChange={(e) => onSelect("request", e.target.value as T)}
            >
              {types.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </Select>
          </HStack>
          <HStack gap="1">
            <Tooltip content={`${type} limit`}>
              <TextField
                placeholder="limit"
                hideLabel
                label={`${type} limit`}
                className="w-32"
                value={allocation.limit}
                onChange={(e) => onChange("limit", e.target.value)}
              />
            </Tooltip>
            <Select
              label={`${type} limit type`}
              hideLabel
              className="w-20"
              value={allocation.limitType}
              onChange={(e) => onSelect("limit", e.target.value as T)}
            >
              {types.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </Select>
          </HStack>
        </HStack>
      </Box>
    </HStack>
  );
}
