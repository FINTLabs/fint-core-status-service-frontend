import {useRef, useState} from "react";
import {Button, Popover} from "@navikt/ds-react";
import {ExclamationmarkTriangleIcon, MigrationIcon} from "@navikt/aksel-icons";
import {ICapabilityData} from "~/types/IAdapterContract";

interface CapabilityStatusProps {
    capabilities: {
        [key: string]: ICapabilityData;
    };
}

export const CapabilityStatus = ({ capabilities }: CapabilityStatusProps) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const nonCompliant = Object.entries(capabilities).filter(
    ([, value]) => !value.followsContract
  );

  if (nonCompliant.length === 0) return null;

  return (
    <>
      <Button
        variant="tertiary"
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        size="small"
        icon={
          <MigrationIcon title="Vis detaljer om manglende kontrakter" />
        }
      />
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={buttonRef.current}
      >
        <Popover.Content>
          {nonCompliant.map(([key, value]) => (
            <div key={key}>
              <strong>{key}</strong>:{" "}
              {value.lastFullSync===0? ("Ikke levert"):(new Date(value.lastFullSync).toLocaleString())}
            </div>
          ))}
        </Popover.Content>
      </Popover>
    </>
  );
};
