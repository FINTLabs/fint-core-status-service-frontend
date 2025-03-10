import {Box, HStack, Switch, Tooltip} from "@navikt/ds-react";
import {CloudSlashIcon, PencilLineIcon} from "@navikt/aksel-icons";
import React from "react";
import {IResource} from "~/types/consumer/IResource";

interface ResourceBoxProps {
  resource: IResource;
  onResourceSwitch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWriteableSwitch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCacheSwitch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  size?: "medium" | "small" | undefined
  staticWriteable: boolean
}

export default function ResourceBox({
                                      resource,
                                      onResourceSwitch,
                                      onWriteableSwitch,
                                      onCacheSwitch,
                                      size = "normal",
                                      readOnly = false,
                                      staticWriteable = false,
                                    }: ResourceBoxProps) {
  const gapValue = size === "small" ? "2" : "4";
  const boxHeight = size === "small" ? "h-6" : "h-8"

  return (
    <Box key={resource.name} className={`w-full ${boxHeight} flex-col flex justify-center p-2`}>
      <HStack justify="space-between">
        <Switch
          size={size}
          readOnly={readOnly}
          value={resource.name}
          checked={resource.enabled}
          onChange={onResourceSwitch}
        >
          {resource.name}
        </Switch>
        <HStack gap={gapValue}>
          <Tooltip content="Skrivbar">
            <Switch
              size={size}
              readOnly={readOnly}
              disabled={staticWriteable}
              checked={resource.writeable}
              onChange={onWriteableSwitch}
            >
              <PencilLineIcon aria-hidden/>
            </Switch>
          </Tooltip>
          <Tooltip content="Slå av cache">
            <Switch
              size={size}
              readOnly={readOnly}
              checked={resource.cacheDisabled}
              onChange={onCacheSwitch}
            >
              <CloudSlashIcon aria-hidden/>
            </Switch>
          </Tooltip>
        </HStack>
      </HStack>
    </Box>
  );
}
