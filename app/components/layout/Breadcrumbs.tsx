import { Link } from "react-router";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { Box } from "@navikt/ds-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb" data-cy="breadcrumbs">
      <Link to="/adaptere" className="flex items-center hover:text-blue-600 transition-colors" aria-label="Go to home">
        Adaptere
      </Link>

      {items.map((item, index) => (
        <Box key={index} className="flex items-center space-x-2">
          <ChevronRightIcon fontSize="0.875rem" className="text-gray-400" />
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link to={item.href} className="hover:text-blue-600 transition-colors">
              {item.label}
            </Link>
          )}
        </Box>
      ))}
    </nav>
  );
}
