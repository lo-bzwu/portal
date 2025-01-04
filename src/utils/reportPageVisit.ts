import { pb } from "../pb";

interface PageVisit {
  user: string;
  page: "home" | "topics" | "council" | "contribute" | "news";
  suffix?: string;
  props?: unknown;
  external_url?: string;
}

const logPageVisit = (visit: Omit<PageVisit, "user">) => {
  // cant create page visit record without user info
  if (!pb.authStore.record) return;
  const pageVisit: PageVisit = { ...visit, user: pb.authStore.record?.id };
  pb.collection("page_visit").create<PageVisit>(pageVisit);
};

export default logPageVisit;
