import { useEffect, useState } from "react";
import Panel from "../components/panel";
import { pb } from "../pb";
import { getRelativeTime } from "../utils/time";
import { formatTopicStatus } from "../utils/formatters";
import DOMPurify from "dompurify";

interface Topic {
  id: string;
  title: string;
  status: "none" | "ongoing" | "done";
  locations: string[];
  collectionName: string;
  expand: {
    topic_feed_via_topic: {
      content: string;
      updated: string;
      collectionName: string;
      id: string;
    }[];
  };
}

const Topics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("topic"))
      setSelectedTopicId(searchParams.get("topic"));

    pb.collection("topics")
      .getList<Topic>(1, 20, {
        fields: "id,title,locations,collectionName,status,expand",
        expand: "topic_feed_via_topic",
      })
      .then((topics) => {
        setTopics(topics.items);
        setLoadingComplete(true);
        if (topics.items.length > 0 && !searchParams.has("topic"))
          setSelectedTopicId(topics.items[0].id);
      })
      .catch(setError);
  }, []);

  const selectedTopic = topics.find((topic) => topic.id === selectedTopicId);

  return (
    <main className="flex overflow-hidden flex-col flex-1 gap-4 mt-4 md:flex-row">
      <Panel
        color="positive"
        title="Themen"
        error={error}
        loading={!loadingComplete}
        className="md:max-w-[300px]"
      >
        <div className="flex flex-col gap-2 mt-2">
          {topics.map((topic) => (
            <button
              onClick={() => setSelectedTopicId(topic.id)}
              key={topic.id}
              data-active={selectedTopicId === topic.id}
              className="p-2 px-3 text-left rounded-lg border-2 cursor-pointer data-[active=true]:bg-brand-theme-shade bg-secondary data-[active=true]:border-brand-theme data-[active=true]:text-brand-theme transition-colors duration-150"
            >
              {topic.title}
            </button>
          ))}
        </div>
      </Panel>
      <Panel
        className="flex-1"
        color="negative"
        title=""
        loading={topics.length === 0}
      >
        <div className="flex flex-col gap-4 mt-2">
          {selectedTopic ? (
            <div>
              <div className="flex flex-col-reverse md:gap-4 md:flex-row">
                <h1 className="text-2xl font-bold">{selectedTopic.title}</h1>
                <span className="flex items-center w-full text-center whitespace-nowrap rounded-full md:px-4 md:w-fit md:bg-brand-theme-shade text-brand-theme">
                  {formatTopicStatus(selectedTopic.status)}
                </span>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                {selectedTopic.expand &&
                  selectedTopic.expand.topic_feed_via_topic.map((feed) => (
                    <div
                      key={feed.id}
                      className="relative p-4 rounded-lg bg-secondary"
                    >
                      <div
                        className="w-full embedded-content"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(feed.content),
                        }}
                      />
                      <p className="absolute top-4 right-4 opacity-50">
                        {getRelativeTime(new Date(feed.updated))}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <p>Kein Thema ausgewählt</p>
          )}
        </div>
      </Panel>
    </main>
  );
};

export default Topics;
