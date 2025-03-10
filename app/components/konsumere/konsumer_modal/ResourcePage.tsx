import {IConsumer} from "~/types/consumer/IConsumer";
import {ChangeEvent, useEffect, useState} from "react";
import {useFetcher} from "@remix-run/react";
import {IComponent} from "~/types/consumer/IComponent";
import {IResource} from "~/types/consumer/IResource";
import {Accordion, Heading, VStack} from "@navikt/ds-react";
import ResourceBox from "~/components/konsumere/konsumer_modal/ResourceBox";

interface ResourceFieldsProps {
  consumer: IConsumer;
  setConsumer: React.Dispatch<React.SetStateAction<IConsumer>>;
}

export default function ResourcePage({consumer, setConsumer}: ResourceFieldsProps) {
  const fetcher = useFetcher<IComponent>();
  const [staticWriteableResources, setStaticWriteableResources] = useState<Set<string>>(new Set());

  const updateResource = (
    componentName: string,
    resourceName: string,
    changes: Partial<IResource>
  ) => {
    setConsumer(prevConsumer => ({
      ...prevConsumer,
      components: {
        ...prevConsumer.components,
        [componentName]: prevConsumer.components[componentName].map(resource =>
          resource.name === resourceName ? {...resource, ...changes} : resource
        )
      }
    }));
  };

  useEffect(() => {
    const componentKeys = Object.keys(consumer.components);
    const queryParams = new URLSearchParams();
    componentKeys.forEach(key => queryParams.append("components", key));
    fetcher.load(`/konsumere/komponenter?${queryParams.toString()}`);
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setConsumer(prevConsumer => ({
        ...prevConsumer,
        components: updateConsumerResources(prevConsumer.components, fetcher.data!)
      }));

      setStaticWriteableResources(
        new Set(
          Object.entries(fetcher.data).flatMap(([componentName, resources]) =>
            resources
              .filter((resource: IResource) => resource.writeable)
              .map((resource: IResource) => `${componentName} ${resource.name}`)
          )
        )
      );
    }
  }, [fetcher.data, setConsumer]);

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
                  staticWriteable={staticWriteableResources.has(`${componentName} ${resource.name}`)}
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

function updateConsumerResources(existing: IComponent, newComponents: IComponent): IComponent {
  const updatedComponents = {...existing};

  for (const key in newComponents) {
    const newResources: IResource[] = newComponents[key];

    if (!updatedComponents[key]) {
      updatedComponents[key] = newResources;
    } else {
      const mergedResources = [...updatedComponents[key]];
      newResources.forEach(newRes => {
        const exists = mergedResources.some(existingRes => existingRes.name === newRes.name);
        if (!exists) {
          mergedResources.push(newRes);
        }
      });
      updatedComponents[key] = mergedResources;
    }
  }
  return updatedComponents;
}
