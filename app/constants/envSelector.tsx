import { Select } from "@navikt/ds-react";

export const EnvSelector = () => {
    return (
        <Select label={""}>
        <option value="API">API</option>
        <option value="BETA">BETA</option>
        <option value="APLHA">ALPHA</option>
        </Select>
);
};