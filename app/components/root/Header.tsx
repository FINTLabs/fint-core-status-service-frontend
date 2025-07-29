import {HStack, LinkCard} from "@navikt/ds-react";
import HeaderElement from "~/components/header/HeaderElement";
import {MENU_LINKS} from "~/constants/menu";
import {EnvSelector} from "~/constants/envSelector";
import {BriefcaseIcon, ChangingRoomIcon, HouseIcon, LineGraphDotIcon, XMarkOctagonIcon} from "@navikt/aksel-icons";

const iconList = [
    [<HouseIcon title="Dashboard icon" key={"dashboard"} fontSize="1.5rem"/>],
    [<BriefcaseIcon title="Kontakter icon" key={"kontakter"} fontSize="1.5rem"/>],
    [<LineGraphDotIcon title="Hendelser icon" key={"hendelser"} fontSize="1.5rem"/>],
    [<ChangingRoomIcon title="Konsumere icon" key={"Konsumere"} fontSize="1.5rem"/>],
    [<XMarkOctagonIcon title="ProviderError" key={"ProviderError"} fontSize="1.5rem"/>]
]

interface headerProps {
    onHeaderChange: (newEnv: string) => void;
    value: string;
}

export default function Header({onHeaderChange, value}: headerProps) {
    return (
        <HStack className="w-full px-48 h-full flex justify-between" as={"header"}>
            <HeaderElement>
                Kult navn
            </HeaderElement>
            <HeaderElement>
                {MENU_LINKS.map((menuLink, index) => (
                    <LinkCard key={index}>
                        <LinkCard.Anchor href={menuLink.href}><></>
                        </LinkCard.Anchor>
                        <LinkCard.Icon>{iconList[index]}</LinkCard.Icon>
                        <LinkCard.Title>{menuLink.name}</LinkCard.Title>
                    </LinkCard>
                ))}
            </HeaderElement>
            <HeaderElement>
                <EnvSelector onChange={onHeaderChange} value={value}/>
            </HeaderElement>
        </HStack>
    );
}
