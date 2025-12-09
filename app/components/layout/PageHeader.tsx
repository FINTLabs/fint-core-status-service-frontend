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
        <Heading size="xlarge" spacing>
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

//
// import { Heading, BodyLong, Box, HStack } from "@navikt/ds-react";
// import { Breadcrumbs } from "./Breadcrumbs";
// import type { ReactElement } from "react";
//
// interface BreadcrumbItem {
//   label: string;
//   href: string;
// }
//
// interface PageHeaderProps {
//   title: string;
//   description: string;
//   env?: string;
//   breadcrumbItems: BreadcrumbItem[];
//   icon?: ReactElement;
// }
//
// export function PageHeader({ title, description, env, breadcrumbItems, icon }: PageHeaderProps) {
//   return (
//     <>
//       <Breadcrumbs items={breadcrumbItems} />
//
//       <Box background="surface-alt-3-subtle" padding="8" borderRadius="xlarge" marginBlock="8">
//         <HStack gap="4" align="center" wrap={false}>
//           {icon && (
//             <Box
//               style={{
//                 fontSize: "2.5rem",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {icon}
//             </Box>
//           )}
//           <Box>
//             <Heading size="xlarge" spacing>
//               {title}
//               {env && (
//                 <Box
//                   as="span"
//                   style={{
//                     marginLeft: "1rem",
//                     fontSize: "1.25rem",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {env}
//                 </Box>
//               )}
//             </Heading>
//             <BodyLong size="large" textColor="subtle">
//               {description}
//             </BodyLong>
//           </Box>
//         </HStack>
//       </Box>
//     </>
//   );
// }
