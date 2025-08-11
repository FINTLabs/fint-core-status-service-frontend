import {Select} from "@navikt/ds-react";

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
        <Select label="" size={"small"} hideLabel defaultValue={value} onChange={handleChange} className={"!bg-[#5A51E1]/5" +
            " w-24"}>
            <option value="api">API</option>
            <option value="beta">BETA</option>
            <option value="alpha">ALPHA</option>
        </Select>
    );
};
