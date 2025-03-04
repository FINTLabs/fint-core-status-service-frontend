import {Box, HStack, Select, Switch, Tooltip, UNSAFE_Combobox, VStack} from "@navikt/ds-react";
import {IConsumer} from "~/types/IConsumer";
import {IConsumerMetadata} from "~/types/IConsumerMetadata";

interface SetupFieldsProps {
  consumer: IConsumer
  setConsumer: React.Dispatch<React.SetStateAction<IConsumer>>
  consumerMetadata: IConsumerMetadata
}

export default function SetupFields({consumer, setConsumer, consumerMetadata}: SetupFieldsProps) {
  const handleChange = (field: keyof IConsumer, value: string | boolean | string[]) => {
    setConsumer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateListField = (
    field: keyof Pick<IConsumer, "organisations" | "components">,
    option: string,
    isSelected: boolean
  ) => {
    setConsumer((prev) => ({
      ...prev,
      [field]: isSelected
        ? [...prev[field], option]
        : prev[field].filter((o: string) => o !== option),
    }));
  }

  return (
    <>
      <HStack justify="space-between" gap="2" wrap={false}>
        <UNSAFE_Combobox
          className="w-full"
          isMultiSelect
          selected
          label="Velg organisasjoner"
          options={consumerMetadata.orgs}
          selectedOptions={consumer.organisations}
          onToggleSelected={(option, isSelected) => updateListField("organisations", option, isSelected)}
          disabled={consumer.shared}
        />
        <VStack justify="center">
          <HStack gap="2" className="pt-8">
            <Tooltip content="Alle organisasjoner deler samme consumer">
              <Switch onChange={e => handleChange("shared", e.target.checked)}>Felles</Switch>
            </Tooltip>
          </HStack>
        </VStack>
      </HStack>
      <HStack gap="2" wrap={false}>
        <UNSAFE_Combobox
          className="w-full"
          isMultiSelect
          selected
          label="Velg Komponent"
          options={consumerMetadata.components}
          selectedOptions={consumer.components}
          onToggleSelected={(option, isSelected) => updateListField("components", option, isSelected)}
        />
      </HStack>
      <Select
        className="w-44"
        hideLabel
        label="Velg Versjon"
        onChange={(e) => handleChange("version", e.target.value)}
      >
        <option value="">- Velg Versjon -</option>
        {consumerMetadata.versions.map((version) => (
          <option value={version}>{version}</option>
        ))}
      </Select>
    </>
  )
}