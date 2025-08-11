import HeaderElement from "~/components/header/HeaderElement";
import {EnvSelector} from "~/constants/envSelector";
import {NovariHeader} from "novari-frontend-components";
import {useNavigate} from "react-router";
import {Heading} from "@navikt/ds-react";

interface headerProps {
    onHeaderChange: (newEnv: string) => void;
    value: string;
}

export default function Header({onHeaderChange, value}: headerProps) {
    const navigate = useNavigate();

    return (
        <>
            <NovariHeader appName={"Kundeportalen"} showLogoWithTitle={true} menu={[
                ["Home", "/"],
                {
                    label: "Main Sections",
                    items: [
                        ["About", "/about"],
                        ["Team", "/team"],
                        ["Careers", "/careers"],
                    ],
                },
                ["Contact", "/contact"],
                {
                    label: "Settings",
                    items: [
                        ["Profile", "/profile"],
                        ["Security", "/security"],
                    ],
                },
            ]} isLoggedIn={true}

            ></NovariHeader>
            <NovariHeader showLogoWithTitle={false} appName={"Status Service"} menu={[
                ["Dashboard", "/"],
                ["Kontrakter", "/Kontrakter"],
                ["Hendelser", "/hendelser"],
                ["Konsumere", "/Konsumere"],
                ["ProviderError", "/providerFeil"]
            ]}
                          onMenuClick={(action) => navigate(action)}
                          isLoggedIn={true}>
            </NovariHeader>
            <HeaderElement>
                <div className={"w-full h-fit px-66 flex flex-row gap-3 items-center justify-end bg-[#FCF5ED]"}>
                    <Heading size={"medium"}>Velg Miljø</Heading>
                    <EnvSelector onChange={onHeaderChange} value={value}/>
                </div>
            </HeaderElement>

        </>
    );
}
