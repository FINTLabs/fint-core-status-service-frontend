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
            ]}
            isLoggedIn={true}
            onLogout={() => (console.log("logout"))}
            displayName={"Ola Nordmann"}
            />
            <div className={"w-full border-b-2 border-[#6B133D]"}/>

            <NovariHeader showLogoWithTitle={false} appName={"Status Service"} menu={[
                ["Dashboard", "/"],
                ["Kontrakter", "/Kontrakter"],
                ["Hendelser", "/hendelser"],
                ["Konsumere", "/Konsumere"],
                ["ProviderError", "/providerFeil"]
            ]}
                          onMenuClick={(action) => navigate(action)}
                          isLoggedIn={true}/>
            <HeaderElement>
                <div className={"h-fit flex flex-row gap-3 items-center justify-end " +
                    " absolute top-16 right-4 z-20"}>
                    <Heading size={"small"}>Velg Miljø</Heading>
                    <EnvSelector onChange={onHeaderChange} value={value}/>
                </div>
            </HeaderElement>

        </>
    );
}
