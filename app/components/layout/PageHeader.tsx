import { BodyLong, Box, Heading, HStack } from "@navikt/ds-react";
interface PageHeaderProps {
  title: string;
  description: string;
  env?: string;
  icon?: React.ElementType;
}

export function PageHeader({ title, description, env, icon: IconComponent }: PageHeaderProps) {
  return (
    <Box className={"ml-8 mb-8"}>
      <HStack marginBlock="2" gap="4" align="center">
        {IconComponent && <IconComponent title="Header Icon" fontSize="2.5rem" />}
        <Heading size="xlarge" >
          {title}
          {env && <span style={{ fontSize: "2rem", color: "var(--a-surface-alt-3-moderate)" }}> : {env}</span>}
        </Heading>
      </HStack>
      <BodyLong size="large" textColor="subtle">
        {description}
      </BodyLong>
    </Box>
  );
}

