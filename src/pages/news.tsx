import { useEffect, useState } from "react";
import type { NavigateFunc } from "../App";
import Panel from "../components/panel";
import { pb } from "../pb";
import DOMPurify from "dompurify";

interface Post {
  title: string;
  subtitle: string;
  collectionName: string;
  content: string;
  locations: string[];
  image: string;
}

const News = ({ navigate }: { navigate: NavigateFunc }) => {
  const [post, setPost] = useState<null | Post>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = window.location.pathname.split("/news/")[1];
    if (!id) return navigate("home");

    pb.collection("posts")
      .getOne<Post>(id.split("-")[0])
      .then((p) => {
        if (!p) return;
        document.title = "BZWU LO | " + p.title;
        setPost(p);
      })
      .catch(setError);
  }, []);

  return (
    <main className="flex overflow-hidden justify-center mt-4 max-h-full">
      <div className="flex flex-col gap-4 w-full max-w-screen-md">
        <button
          onClick={() => navigate("home")}
          className="int-btn--blue w-fit"
        >
          Zurück
        </button>
        <Panel
          loading={post === null || error != null}
          title={post?.title ?? ""}
          error={error}
          color="positive"
          className="flex-1 w-full"
        >
          {post && (
            <div
              className="mt-2 w-full whitespace-pre-wrap embedded-content"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post?.content),
              }}
            />
          )}
        </Panel>
      </div>
    </main>
  );
};

export default News;
