import { pb } from "../pb";

interface PageVisit {
  user: string;
  page: "home" | "topics" | "council" | "contribute" | "news";
  suffix?: string;
  props?: unknown;
  external_url?: string;
}

const logPageVisit = (visit: Omit<PageVisit, "user">) => {
  const pageVisit: PageVisit = { ...visit, user: pb.authStore.model?.id };
  pb.collection("page_visit").create<PageVisit>(pageVisit);
};

export default logPageVisit;
