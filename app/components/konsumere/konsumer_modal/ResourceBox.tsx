import {Box, HStack, Switch, Tooltip} from "@navikt/ds-react";
import {CloudSlashIcon, PencilLineIcon} from "@navikt/aksel-icons";
import {IResource} from "~/types/IComponent";
import React from "react";

interface ResourceBoxProps {
  resource: IResource;
  onResourceSwitch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWriteableSwitch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCacheSwitch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  size?: "medium" | "small" | undefined
  staticWriteableResources?: Set<string>;
}

export default function ResourceBox({
                                      resource,
                                      onResourceSwitch,
                                      onWriteableSwitch,
                                      onCacheSwitch,
                                      size = "normal",
                                      readOnly = false,
                                      staticWriteableResources = new Set(),
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
          chegacked={resource.enabled}
          onChange={onResourceSwitch}
        >
          {resource.name}
        </Switch>
        <HStack gap={gapValue}>
          <Tooltip content="Skrivbar">
            <Switch
              size={size}
              readOnly={readOnly}
              disabled={staticWriteableResources.has(resource.name)}
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
