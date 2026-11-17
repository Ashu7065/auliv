import { useLayoutEffect } from "react";
import { applyDocumentHead, normalizePath } from "@/lib/seo";

/** Keeps the document head in step with the route. Navigation is a full page load; popstate covers back/forward. */
export function DocumentHead({ path }: { path: string }) {
  useLayoutEffect(() => {
    applyDocumentHead(path);
    const onPop = () => applyDocumentHead(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [path]);
  return null;
}
