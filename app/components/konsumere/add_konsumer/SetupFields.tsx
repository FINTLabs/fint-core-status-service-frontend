import {Select} from "@navikt/ds-react";
import {IConsumer} from "~/types/IConsumer";
import {IConsumerMetadata} from "~/types/IConsumerMetadata";

interface SetupFieldsProps {
  setConsumer: React.Dispatch<React.SetStateAction<IConsumer>>,
  consumerMetadata: IConsumerMetadata
}

export default function SetupFields({setConsumer, consumerMetadata}: SetupFieldsProps) {
  const handleChange = (field: keyof IConsumer, value: string | boolean | string[]) => {
    setConsumer((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <Select
        hideLabel
        label="Velg Organisasjon"
        onChange={(e) => handleChange("org", e.target.value)}
      >
        <option value="">- Velg Organisasjon -</option>
        {consumerMetadata.orgs.map((org) => (
          <option value={org}>{org}</option>
        ))}
      </Select>
      <Select
        hideLabel
        label="Velg Komponent"
        onChange={(e) => {
          const [domain, pkg] = e.target.value.split(" ")
          handleChange("domain", domain)
          handleChange("package", pkg)
        }}
      >
        <option value="">- Velg Komponent -</option>
        {consumerMetadata.components.map((component) => (
          <option value={component}>{component}</option>
        ))}
      </Select>
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