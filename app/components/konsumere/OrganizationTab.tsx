import {ArrowsCirclepathIcon, CaretRightCircleIcon, XMarkOctagonIcon} from "@navikt/aksel-icons";
import React from "react";
import {Tab, TabField} from "~/components/konsumere/Tab";

interface OrganizationTabProps {
  org: string;
  applications: number;
  errors: number;
  restarts: number;
  onClick?: () => void;
  className?: string;
}

export function OrganizationTab({
                                  org,
                                  applications,
                                  errors,
                                  restarts,
                                  onClick,
                                  className,
                                }: OrganizationTabProps) {
  const fields: TabField[] = [
    {icon: <CaretRightCircleIcon aria-hidden/>, value: applications, toolTip: "Antall konsumere"},
    {icon: <XMarkOctagonIcon aria-hidden/>, value: errors, toolTip: "Antall feil i alle konsumere"},
    {icon: <ArrowsCirclepathIcon aria-hidden/>, value: restarts, toolTip: "Antall restart av konsumere"},
  ];

  return <Tab
    header={org}
    fields={fields}
    onClick={onClick}
    className={className}
  />;
}