"use client";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import NextLink from "next/link";

export default function DynamicBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Split path segments and remove empty or falsy values
    const pathSegments = pathname.split("/").filter((segment) => segment);

    // Determine if the "Dashboard" link is the last segment
    const isRootSegment = pathSegments.length === 0;

    // Create the "Dashboard" breadcrumb
    const dashboardBreadcrumb = isRootSegment ? (
      <Typography key="/" color="textPrimary">
        Dashboard
      </Typography>
    ) : (
      <Link key="/" href="/" underline="hover" color="textSecondary" component={NextLink}>
        Dashboard
      </Link>
    );

    // Create breadcrumbs for each segment
    const dynamicBreadcrumbs = pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const isLast = index === pathSegments.length - 1;
      const capitalizedSegment = segment.charAt(0).toUpperCase() + segment.slice(1);

      return isLast ? (
        <Typography key={href} color="textPrimary">
          {capitalizedSegment}
        </Typography>
      ) : (
        <Link key={href} href={href} underline="hover" color="textSecondary">
          {capitalizedSegment}
        </Link>
      );
    });

    // Combine the "Dashboard" and dynamic breadcrumbs
    return [dashboardBreadcrumb, ...dynamicBreadcrumbs];
  }, [pathname]);

  return (
    <Breadcrumbs sx={{ mt: 3, ml: 3 }}>
      {/* <Link href="/" underline="hover" color="textDisabled">
        Dashboard
      </Link> */}
      {breadcrumbs}
    </Breadcrumbs>
  );
}
