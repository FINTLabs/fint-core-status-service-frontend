import {IConsumer} from "~/types/IConsumer";
import {ChangeEvent, useMemo} from "react";
import {Accordion, Heading, VStack} from "@navikt/ds-react";
import ResourceBox from "./ResourceBox"; // adjust the import path as needed
import {IResource} from "~/types/IComponent";

interface ResourceFieldsProps {
  consumer: IConsumer;
  setConsumer: React.Dispatch<React.SetStateAction<IConsumer>>;
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
    <Accordion>
      {Object.entries(consumer.components).map(([componentName, resources]) => (
        <Accordion.Item key={componentName}>
          <Accordion.Header className="pl-2">
            <Heading size="medium">{componentName}</Heading>
          </Accordion.Header>
          <Accordion.Content>
            <VStack gap="2">
              {resources.map((resource, i) => (
                <ResourceBox
                  readOnly={false}
                  key={resource.name + i}
                  resource={resource}
                  staticWriteableResources={staticWriteableResources}
                  onResourceSwitch={(e: ChangeEvent<HTMLInputElement>) =>
                    updateResource(componentName, resource.name, {enabled: e.target.checked})
                  }
                  onWriteableSwitch={(e: ChangeEvent<HTMLInputElement>) =>
                    updateResource(componentName, resource.name, {writeable: e.target.checked})
                  }
                  onCacheSwitch={(e: ChangeEvent<HTMLInputElement>) =>
                    updateResource(componentName, resource.name, {cacheDisabled: e.target.checked})
                  }
                />
              ))}
            </VStack>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
