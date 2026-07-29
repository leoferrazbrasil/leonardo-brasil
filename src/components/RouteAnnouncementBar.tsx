import { useLocation } from "../lib/local-router";
import { AnnouncementBar } from "./AnnouncementBar";

const ROUTES_WITHOUT_ANNOUNCEMENT = new Set([
  "/porto-alegre-digital",
]);

export function RouteAnnouncementBar() {
  const { pathname } = useLocation();

  if (ROUTES_WITHOUT_ANNOUNCEMENT.has(pathname)) {
    return null;
  }

  return <AnnouncementBar />;
}
