import { useEffect, useMemo, useState } from "react";
import Panel from "../components/panel";
import { pb } from "../pb";

interface Topic {
  id: string;
  title: string;
  locations: string[];
}

function Topics(props: { onTopicClicked: (topic_id: string) => void }) {
  const [data, setData] = useState<Topic[]>([]);

  useEffect(() => {
    pb.collection("topics")
      .getList<Topic>(1, 20, {
        fields: "id,title,locations,collectionName",
        filter: "highlight = true",
      })
      .then((topics) => {
        setData(topics.items);
      });
  }, []);

  if (data.length) {
    return (
      <Panel title="Mitmachen bei der LO" color="negative">
        <div className="flex flex-col gap-4 mt-4 h-full">
          <p>
            Willst du dich auch für eine noch besser Zukunft am BZWU engagieren?
          </p>
          <div className="flex flex-col gap-2 justify-end w-full h-full">
            <button className="int-btn--red">Mitmachen im Gremium</button>
            <button className="int-btn--red">
              Mitmachen beim Socialmedia Team
            </button>
            <button className="int-btn--red">
              Mitmachen bei der Websiteentwicklung
            </button>
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <Panel title="Aktuelle Themen" color="negative" loading={data.length === 0}>
      <div className="flex flex-col gap-4 mt-4">
        {data.map((topic) => (
          <button
            onClick={() => props.onTopicClicked(topic.id)}
            key={topic.id}
            className="overflow-hidden px-4 py-3 w-full text-left rounded-xl border-2 text-brand-theme border-brand-theme bg-brand-theme-shade"
          >
            <p className="text">{topic.title}</p>
          </button>
        ))}
      </div>
    </Panel>
  );
}

export default Topics;
