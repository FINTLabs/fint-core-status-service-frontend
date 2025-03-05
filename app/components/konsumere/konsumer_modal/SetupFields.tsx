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
      <Select
        className="w-44"
        label="Velg Versjon"
        onChange={(e) => handleChange("version", e.target.value)}

      >
        {consumerMetadata.versions.map((version) => (
          <option value={version}>{version}</option>
        ))}
      </Select>
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
          <Box gap="2" className="pt-8">
            <Tooltip content="Alle organisasjoner får sin egen consumer">
              <Switch
                onChange={e => {
                  e.target.checked
                    ? handleChange("organisations", consumerMetadata.orgs)
                    : handleChange("organisations", [])
                }}
                disabled={consumer.shared}
              >
                Alle
              </Switch>
            </Tooltip>
          </Box>
        </VStack>
        <VStack justify="center">
          <Box gap="2" className="pt-8">
            <Tooltip content="Alle organisasjoner deler samme consumer">
              <Switch onChange={e => handleChange("shared", e.target.checked)}>Felles</Switch>
            </Tooltip>
          </Box>
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
        <VStack justify="center">
          <Box gap="2" className="pt-8">
            <Tooltip content="Alle organisasjoner deler samme consumer">
              <Switch
                onChange={e => {
                  e.target.checked
                    ? handleChange("components", consumerMetadata.components)
                    : handleChange("components", [])
                }}
              >
                Alle
              </Switch>
            </Tooltip>
          </Box>
        </VStack>
      </HStack>
    </>
  )
}