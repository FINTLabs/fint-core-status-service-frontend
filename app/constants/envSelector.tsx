import { Select } from "@navikt/ds-react";

export const EnvSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <Select label="" hideLabel defaultValue={value} onChange={handleChange}>
      <option value="api">API</option>
      <option value="beta">BETA</option>
      <option value="alpha">ALPHA</option>
    </Select>
  );
};
