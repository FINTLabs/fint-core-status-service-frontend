import { HStack, LinkCard, Tooltip } from "@navikt/ds-react";
import React from "react";

export interface TabField {
  icon: React.ReactNode;
  value: number | string;
  toolTip: string;
}

interface TabProps {
  header: string;
  fields: TabField[];
  onClick?: () => void;
}

export function Tab({ header, fields, onClick }: TabProps) {
  return (
    <LinkCard className={"w-[31%] !bg-[#FCF5ED]"} onClick={onClick}>
      <LinkCard.Title>{header}</LinkCard.Title>
      <LinkCard.Description>
        {fields.map((field, index) => (
          <Tooltip key={field.value} content={field.toolTip} placement={"left"}>
            <HStack key={index} gap="2" align="center">
              {field.icon}
              {field.value}
            </HStack>
          </Tooltip>
        ))}
      </LinkCard.Description>
    </LinkCard>
  );
}
