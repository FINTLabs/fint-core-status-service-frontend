import {Select, UNSAFE_Combobox} from "@navikt/ds-react";
import {IConsumer} from "~/types/IConsumer";
import {IConsumerMetadata} from "~/types/IConsumerMetadata";
import {useEffect, useState} from "react";

interface SetupFieldsProps {
  setConsumer: React.Dispatch<React.SetStateAction<IConsumer>>,
  consumerMetadata: IConsumerMetadata
}

export default function SetupFields({setConsumer, consumerMetadata}: SetupFieldsProps) {

  useEffect(() => {
    console.log("User state changed:", organisations);
  }, [organisations]);

  const handleChange = (field: keyof IConsumer, value: string | boolean | string[]) => {
    setConsumer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelection = (setter, option, isSelected) => {
    setter(prev =>
      isSelected
        ? [...prev, option]
        : prev.filter(o => o !== option)
    )
  }

  return (
    <>
      <UNSAFE_Combobox
        isMultiSelect
        selected
        label="Velg organisasjoner"
        options={consumerMetadata.orgs}
        selectedOptions={organisations}
        onToggleSelected={(option, isSelected) => handleSelection(setOrganisations, option, isSelected)}
      />
      <UNSAFE_Combobox
        isMultiSelect
        selected
        label="Velg Komponent"
        options={consumerMetadata.components}
        selectedOptions={organisations}
        onToggleSelected={(option, isSelected) => handleSelection(setOrganisations, option, isSelected)}
      />
      <Select
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