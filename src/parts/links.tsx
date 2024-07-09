import { useEffect, useState } from "react";
import Panel from "../components/panel";
import { pb } from "../pb";

function lightenColor(color: string, percent: number) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.round(R + (255 - R) * percent);
  G = Math.round(G + (255 - G) * percent);
  B = Math.round(B + (255 - B) * percent);

  const RR = R.toString(16).toString().padStart(2, "0").replace("-", "");
  const GG = G.toString(16).toString().padStart(2, "0").replace("-", "-");
  const BB = B.toString(16).toString().padStart(2, "0").replace("-", "");

  return "#" + RR + GG + BB;
}

interface Link {
  id: string;
  label: string;
  url: string;
  preview: string;
  color: string;
  collectionName: string;
}

function Links({
  classes,
  isTeacher,
}: {
  classes: string[];
  isTeacher: boolean;
}) {
  const [data, setData] = useState<Link[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    pb.collection("links")
      .getList<Link>(1, 20, {
        fields: "id,label,url,collectionName,preview,color",
        sort: "+order",
        filter: isTeacher
          ? "teacherOnly = true"
          : "teacherOnly = false && classes = '' || " +
            classes
              .map((c) => 'classes ~ "' + c.replace('"', "") + '"')
              .join(" || "),
      })
      .then((links) => {
        setData(links.items);
        setIsLoaded(true);
      })
      .catch(setError);
  }, [classes, isTeacher]);

  return (
    <Panel
      title="Weitere Links"
      color="negative"
      loading={!isLoaded}
      error={error}
    >
      <div className="flex flex-col gap-2 mt-4">
        {data.map((link) => {
          return (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.id}
              className="flex overflow-hidden gap-4 items-center px-4 py-3 rounded-xl bg-secondary"
              style={{
                border: "2px solid " + link.color,
                backgroundColor: lightenColor(link.color, 0.95),
              }}
            >
              <img
                className="object-contain w-6 h-6"
                src={pb.getFileUrl(link, link.preview)}
                alt={link.label}
              />
              <p style={{ color: link.color }} className="flex-1 text-lg">
                {link.label}
              </p>
            </a>
          );
        })}
      </div>
    </Panel>
  );
}

export default Links;
