import { Box, Detail, Heading, HStack, VStack } from "@navikt/ds-react";

interface PageHeaderProps {
  title: string;
  description: string;
  env?: string;
  icon?: React.ElementType;
}

export function PageHeader({
  title,
  description,
  env,
  icon: IconComponent,
}: PageHeaderProps) {
  return (
    <Box className={"ml-8 mb-8"} marginBlock="space-16">
      <HStack marginBlock="space-8" gap="space-16" align="center">
        {IconComponent && (
          <IconComponent title="Header Icon" fontSize="2.5rem" />
        )}
        <VStack gap="space-8">
          <Heading size="large">
            {title}
            {env && (
              <span
                style={{
                  fontSize: "2rem",
                  color: "var(--ax-text-default)",
                }}
              >
                : {env}
              </span>
            )}
          </Heading>
          <Detail>{description}</Detail>
        </VStack>
      </HStack>
    </Box>
  );
}
