import { useEffect, useState } from "react";
import Panel from "../components/panel";
import { pb } from "../pb";

interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  locations: string[];
  image: string;
}

function News(props: { openPost: (id: string, slug: string) => void }) {
  const [data, setData] = useState<NewsItem[]>([]);

  useEffect(() => {
    pb.collection("posts")
      .getList<NewsItem>(1, 20, {
        fields: "title,subtitle,locations,image,id,collectionName",
      })
      .then((posts) => {
        setData(posts.items);
      });
  }, []);

  return (
    <Panel title="News der LO" color="positive" loading={data.length === 0}>
      <div className="flex flex-col gap-4 mt-4">
        {data.map((post) => (
          <button
            onClick={() =>
              props.openPost(
                post.id,
                post.title.toLowerCase().replaceAll(" ", "-")
              )
            }
            key={post.id}
            className="overflow-hidden text-left rounded-xl transition-transform cursor-pointer bg-secondary hover:-translate-y-1"
          >
            {post.image && (
              <div className="relative w-full h-48">
                <p className="absolute top-4 left-4 z-10 px-2 py-1 text-white rounded-xl bg-brand-theme">
                  {post.locations.join(", ")}
                </p>

                <img
                  className="object-cover w-full h-48"
                  src={pb.getFileUrl(post, post.image)}
                  alt={post.title}
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold">{post.title}</h3>
              <p className="opacity-50">{post.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </Panel>
  );
}

export default News;
