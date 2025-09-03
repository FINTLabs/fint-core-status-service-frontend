import { ArrowsCirclepathIcon, XMarkOctagonIcon } from "@navikt/aksel-icons";
import React from "react";
import { ConsumerTab, TabField } from "~/components/konsumere/Tab";

interface ConsumerTabProps {
  consumer: string;
  errors: number;
  restarts: number;
  onClick?: () => void;
  className?: string;
}

export function ConsumerTab({
  consumer,
  errors,
  restarts,
  onClick,
  className,
}: ConsumerTabProps) {
  const fields: TabField[] = [
    {
      icon: <XMarkOctagonIcon aria-hidden />,
      value: errors,
      toolTip: "Antall feil i alle konsumere",
    },
    {
      icon: <ArrowsCirclepathIcon aria-hidden />,
      value: restarts,
      toolTip: "Antall restart av konsumere",
    },
  ];

  return (
    <ConsumerTab
      header={consumer}
      fields={fields}
      onClick={onClick}
      className={className}
    />
  );
}
