import { useRef, useState } from "react";
import { Popover, Button } from "@navikt/ds-react";
import { ArrowCirclepathIcon } from "@navikt/aksel-icons";

export interface CapabilitySyncInfo {
  fullSyncIntervalInDays: number;
  deltaSyncInterval: string;
  followsContract: boolean;
  lastFullSync: number;
}

interface CapabilityStatusProps {
  capabilities: Record<string, CapabilitySyncInfo>;
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
          <ArrowCirclepathIcon title="Vis detaljer om manglende kontrakter" />
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
              {new Date(value.lastFullSync).toLocaleString()}
            </div>
          ))}
        </Popover.Content>
      </Popover>
    </>
  );
};
