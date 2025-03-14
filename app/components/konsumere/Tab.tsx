import {Box, HStack, Tooltip, VStack} from "@navikt/ds-react";
import React from "react";
import clsx from "clsx";

export interface TabField {
  icon: React.ReactNode;
  value: number | string;
  toolTip: string;
}

interface TabProps {
  header: string;
  fields: TabField[];
  onClick?: () => void;
  className?: string;
}

export function Tab({header, fields, onClick, className}: TabProps) {
  return (
    <Box
      borderRadius="large"
      shadow="large"
      width="200px"
      className={clsx("flex flex-col bg-[rgb(152,177,201)]", className)}
      onClick={onClick}
    >
      <Box
        className="text-center bg-header text-body"
        padding="4"
        borderRadius="large"
        width="200px"
      >
        {header}
      </Box>
      <Box borderRadius="0 0 large large" padding="1">
        <VStack gap="1">
          {fields.map((field, index) => (
            <Tooltip content={field.toolTip}>
              <HStack key={index} gap="2" align="center">
                {field.icon}
                {field.value}
              </HStack>
            </Tooltip>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
