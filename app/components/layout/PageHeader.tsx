import { Heading, BodyLong, Box } from "@navikt/ds-react";
import { Breadcrumbs } from "./Breadcrumbs";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  description: string;
  env?: string;
  breadcrumbItems: BreadcrumbItem[];
}

export function PageHeader({ title, description, env, breadcrumbItems }: PageHeaderProps) {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <Box marginBlock="8">
        <Heading size="xlarge" spacing>
          {title}
          {env && ` : ${env}`}
        </Heading>
        <BodyLong size="large" textColor="subtle">
          {description}
        </BodyLong>
      </Box>
    </>
  );
}
