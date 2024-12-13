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
    <Select label="" defaultValue={value} onChange={handleChange}>
      <option value="Api">API</option>
      <option value="Beta">BETA</option>
      <option value="Alpha">ALPHA</option>
    </Select>
  );
};
