"use client";
import { sendGTMEvent } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function PageViewsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    sendGTMEvent({
      event: "pageview",
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
export default PageViewsTracker;
