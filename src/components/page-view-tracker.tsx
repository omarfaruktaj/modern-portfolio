"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function PageViewsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // push a custom event to indicate a page navigation
    window.dataLayer?.push({
      event: "pageview",
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
export default PageViewsTracker;
