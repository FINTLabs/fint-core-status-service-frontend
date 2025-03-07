import {IConsumer} from "~/types/IConsumer";
import {useMemo} from "react";
import {Accordion, Box, Heading, HStack, Switch, Tooltip, VStack} from "@navikt/ds-react";
import {CloudSlashIcon, PencilLineIcon} from "@navikt/aksel-icons";
import {IResource} from "~/types/IComponent";

interface ResourceFieldsProps {
  consumer: IConsumer
  setConsumer: React.Dispatch<React.SetStateAction<IConsumer>>
}

export default function ResourcePage({consumer, setConsumer}: ResourceFieldsProps) {
  const staticWriteableResources = useMemo(
    () => new Set(
      Object.values(consumer.components).flatMap(resources =>
        resources.filter(resource => resource.writeable).map(resource => resource.name)
      )
    ),
    []
  );

  const updateResource = (
    componentName: string,
    resourceName: string,
    changes: Partial<IResource>
  ) => {
    setConsumer((prevConsumer) => ({
      ...prevConsumer,
      components: {
        ...prevConsumer.components,
        [componentName]: prevConsumer.components[componentName].map((resource) =>
          resource.name === resourceName ? {...resource, ...changes} : resource
        ),
      },
    }));
  };

  return (
    <>
      <Accordion>
        {Object.entries(consumer.components).map(([componentName, resources], i) => (
          <Accordion.Item key={componentName + i}>
            <Accordion.Header className="pl-2">
              <Heading size="medium">
                {componentName}
              </Heading>
            </Accordion.Header>
            <Accordion.Content>
              <VStack gap="2">
                {resources.map((resource, i) => (
                  <Box key={resource + i} className="w-full h-12 flex-col flex justify-center p-2">
                    <HStack justify="space-between">
                      <Switch
                        value={resource.name}
                        checked={resource.enabled}
                        onChange={e => {
                          updateResource(componentName, resource.name, {enabled: e.target.checked})
                        }}
                      >
                        {resource.name}
                      </Switch>
                      <HStack gap="4">
                        <Tooltip content="Skrivbar">
                          <Switch
                            disabled={staticWriteableResources.has(resource.name)}
                            checked={resource.writeable}
                            onChange={e => {
                              updateResource(componentName, resource.name, {writeable: e.target.checked})
                            }}
                          >
                            <PencilLineIcon aria-hidden/>
                          </Switch>
                        </Tooltip>
                        <Tooltip content="Slå av cache">
                          <Switch
                            checked={resource.cacheDisabled}
                            onChange={e => {
                              updateResource(componentName, resource.name, {cacheDisabled: e.target.checked})
                            }}
                          >
                            <CloudSlashIcon aria-hidden/>
                          </Switch>
                        </Tooltip>
                      </HStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  )
}