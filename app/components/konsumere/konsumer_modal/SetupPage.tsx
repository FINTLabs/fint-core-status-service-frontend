import {HStack, Select, Switch, Tooltip, UNSAFE_Combobox, VStack} from "@navikt/ds-react";
import {IConsumer} from "~/types/consumer/IConsumer";
import {IConsumerMetadata} from "~/types/consumer/IConsumerMetadata";

interface SetupFieldsProps {
  editing: boolean;
  consumerMetadata: IConsumerMetadata;
  consumer: IConsumer;
  setConsumer: React.Dispatch<React.SetStateAction<IConsumer>>;
}

export default function SetupPage({
                                    editing,
                                    consumerMetadata,
                                    consumer,
                                    setConsumer,
                                  }: SetupFieldsProps) {
  return (
    <VStack gap="2">
      <Select
        className="w-44"
        label="Velg Versjon"
        value={consumer.version}
        onChange={e =>
          setConsumer(prev => ({...prev, version: e.target.value}))
        }
      >
        <option value=""></option>
        {consumerMetadata.versions.map((version) => (
          <option key={version} value={version}>{version}</option>
        ))}
      </Select>
      <HStack justify="space-between" gap="2" wrap={false}>
        <UNSAFE_Combobox
          className="w-full"
          isMultiSelect
          selected
          label="Velg organisasjoner"
          disabled={editing || consumer.shared}
          options={consumerMetadata.organisations}
          selectedOptions={consumer.organisations}
          onToggleSelected={(option, isSelected) =>
            setConsumer(prev => ({
              ...prev,
              organisations: isSelected
                ? [...prev.organisations, option]
                : prev.organisations.filter(o => o != option)
            }))
          }
        />
        <VStack justify="center" className="pt-8">
          <Tooltip content="Velg alle organisasjoner">
            <Switch
              disabled={editing || consumer.shared}
              onChange={e =>
                e.target.checked
                  ? setConsumer(prev => ({...prev, organisations: consumerMetadata.organisations}))
                  : setConsumer(prev => ({...prev, organisations: []}))
              }
            >
              Alle
            </Switch>
          </Tooltip>
        </VStack>
        <VStack justify="center" className="pt-8">
          <Tooltip content="Alle organisasjoner deler samme consumer">
            <Switch
              disabled={editing}
              onChange={e => setConsumer(prev => ({...prev, shared: e.target.checked}))}
            >
              Felles
            </Switch>
          </Tooltip>
        </VStack>
      </HStack>
      <HStack gap="2" wrap={false}>
        <UNSAFE_Combobox
          className="w-full"
          isMultiSelect
          selected
          label="Velg komponenter"
          options={consumerMetadata.components}
          disabled={editing}
          selectedOptions={Object.keys(consumer.components)}
          onToggleSelected={(option, isSelected) =>
            setConsumer(prev => ({
              ...prev,
              components: isSelected
                ? {...prev.components, [option]: []}
                : (({[option]: _, ...newComponents}) => newComponents)(prev.components)
            }))
          }
        />
        <VStack justify="center" className="pt-8">
          <Tooltip content="Alle komponenter">
            <Switch
              disabled={editing}
              onChange={e =>
                setConsumer(prev => ({
                  ...prev,
                  components: e.target.checked
                    ? Object.fromEntries(consumerMetadata.components.map(comp => [comp, []]))
                    : {}
                }))
              }
            >
              Alle
            </Switch>
          </Tooltip>
        </VStack>
      </HStack>
    </VStack>
  );
}
