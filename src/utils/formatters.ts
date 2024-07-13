export const formatTopicStatus = (status: "none" | "ongoing" | "done") =>
  ({
    none: "Nicht gestartet",
    ongoing: "In Bearbeitung",
    done: "Beendet",
  }[status]);

export const formatBlogPostUrl = (post: { id: string; slug: string }) =>
  "/" +
  post.id +
  "-" +
  (post.slug ? post.slug.toLowerCase().replaceAll(/\W+/g, "-") : "");
