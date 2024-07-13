import { useEffect, useState } from "react";
import Panel from "../components/panel";
import { pb } from "../pb";

interface Topic {
  id: string;
  title: string;
  locations: string[];
}

interface ContributionOption {
  id: string;
  text: string;
  post: string;
}

function Topics(props: {
  onTopicClicked: (topic_id: string) => void;
  onContributionOptionClicked: (option: ContributionOption) => void;
}) {
  const [data, setData] = useState<Topic[]>([]);
  // const [error, setError] = useState<null | string>(null);
  const [contributionOptions, setContributionOptions] = useState<
    ContributionOption[]
  >([]);

  useEffect(() => {
    pb.collection("topics")
      .getList<Topic>(1, 20, {
        fields: "id,title,locations,collectionName",
        filter: "highlight = true",
      })
      .then((topics) => {
        setData(topics.items);
      });

    pb.collection("contribution_options")
      .getList<ContributionOption>(1, 10)
      .then((newContributionOptions) => {
        setContributionOptions(newContributionOptions.items);
      });
  }, []);

  if (!data.length) {
    return (
      <Panel title="Mitmachen bei der LO" color="negative">
        <div className="flex flex-col gap-4 mt-4 h-full">
          <p>
            Willst du dich auch für eine noch bessere Zukunft am BZWU
            engagieren?
          </p>
          <div className="flex flex-col gap-2 justify-end w-full h-full">
            {contributionOptions.map((option, i) => (
              <button
                className="int-btn--red"
                key={i}
                onClick={() => props.onContributionOptionClicked(option)}
              >
                {option.text}
              </button>
            ))}
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
