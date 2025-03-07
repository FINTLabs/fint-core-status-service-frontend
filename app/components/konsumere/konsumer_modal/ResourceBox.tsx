import {Box, HStack, Switch, Tooltip} from "@navikt/ds-react";
import {CloudSlashIcon, PencilLineIcon} from "@navikt/aksel-icons";
import {IResource} from "~/types/IComponent";

interface ResourceBoxProps {
  resource: IResource;
  onResourceSwitch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWriteableSwitch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCacheSwitch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  staticWriteableResources: Set<string>;
}

export default function ResourceBox({
                                      resource,
                                      onResourceSwitch,
                                      onWriteableSwitch,
                                      onCacheSwitch,
                                      readOnly = false,
                                      staticWriteableResources,
                                    }: ResourceBoxProps) {
  return (
    <Box key={resource.name} className="w-full h-12 flex-col flex justify-center p-2">
      <HStack justify="space-between">
        <Switch
          readOnly={readOnly}
          value={resource.name}
          checked={resource.enabled}
          onChange={onResourceSwitch}
        >
          {resource.name}
        </Switch>
        <HStack gap="4">
          <Tooltip content="Skrivbar">
            <Switch
              readOnly={readOnly}
              disabled={staticWriteableResources.has(resource.name)}
              checked={resource.writeable}
              onChange={onWriteableSwitch}
            >
              <PencilLineIcon aria-hidden />
            </Switch>
          </Tooltip>
          <Tooltip content="Slå av cache">
            <Switch
              readOnly={readOnly}
              checked={resource.cacheDisabled}
              onChange={onCacheSwitch}
            >
              <CloudSlashIcon aria-hidden />
            </Switch>
          </Tooltip>
        </HStack>
      </HStack>
    </Box>
  );
}
