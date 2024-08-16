import { useEffect, useState } from "react";
import Panel from "../components/panel";
import { pb } from "../pb";
import EmailPositive from "../assets/email-positive.svg";
import EmailNegative from "../assets/email-negative.svg";
import { getRelativeTime } from "../utils/time";
import logPageVisit from "../utils/reportPageVisit";
import { NavigateFunc } from "../App";
import { formatBlogPostUrl } from "../utils/formatters";

interface CouncilMember {
  id: string;
  name: string;
  role: string;
  image: string;
  highlight: boolean;
  description: string;
  email: string;
  collectionName: string;
}

interface Commission {
  id: string;
  name: string;
  description: string;
  leader: string;
  council_leader: string;
  contribute_blog: string;
  expand: {
    commission_members_via_commission: {
      id: string;
      image: string;
      name: string;
      email: string;
      role: string;
    }[];
    contribute_post?: {
      id: string;
      title: string;
    };
  };
}
interface Meeting {
  id: string;
  date: string;
  title: string;
  summary: string;
  link: string;
  protocol_link: string;
  ended: boolean;
}

const Council = ({ navigate }: { navigate: NavigateFunc }) => {
  const [councilMembers, setCouncilMembers] = useState<CouncilMember[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [errors, setErrors] = useState({
    councilMembers: null,
    commissions: null,
    meetings: null,
  });
  const [loadingStates, setLoadingStates] = useState({
    councilMembers: false,
    commissions: false,
    meetings: false,
  });

  useEffect(() => {
    pb.collection("council_members")
      .getList<CouncilMember>(1, 20, {
        fields: "id,collectionName,name,role,description,image,highlight,email",
      })
      .then((members) => {
        setCouncilMembers(members.items);
        setLoadingStates((prev) => ({ ...prev, councilMembers: true }));
      })
      .catch((err) => setErrors((prev) => ({ ...prev, councilMembers: err })));

    pb.collection("commissions")
      .getFullList<Commission>({
        fields: "id,name,description,leader,council_leader,expand",
        expand: "commission_members_via_commission,contribute_post",
      })
      .then((result) => {
        setLoadingStates((prev) => ({ ...prev, commissions: true }));
        setCommissions(result);
      })
      .catch((err) => setErrors((prev) => ({ ...prev, commissions: err })));

    pb.collection("meetings")
      .getFullList<Meeting>({
        fields: "id,title,summary,link,date,ended,protocol_link",
        sort: "-date",
      })
      .then((result) => {
        setLoadingStates((prev) => ({ ...prev, meetings: true }));
        setMeetings(result);
      })
      .catch((err) => setErrors((prev) => ({ ...prev, meetings: err })));
  }, []);

  return (
    <main className="flex overflow-hidden flex-col flex-1 gap-4 mt-4">
      <div>
        <Panel
          color="positive"
          title="Gremium"
          error={errors.councilMembers}
          className="w-full h-fit"
          loading={!loadingStates.councilMembers}
        >
          <div className="flex flex-col gap-2 justify-center mt-10 md:gap-4 md:mt-2 md:flex-row">
            {councilMembers.map((member) => (
              <div
                key={member.id}
                className="p-2 md:p-4 w-full rounded-xl bg-secondary data-[highlight=true]:bg-brand-theme data-[highlight=true]:text-white flex-1"
                data-highlight={member.highlight}
              >
                <div className="flex gap-4 justify-between items-center">
                  <img
                    className="object-cover w-12 rounded-xl md:w-16 aspect-square"
                    src={pb.getFileUrl(member, member.image, {
                      thumb: "100x100",
                    })}
                    alt={"Bild von " + member.name}
                  />
                  <div className="flex-1">
                    <p className="text-xl">{member.name}</p>
                    <p className="opacity-60">{member.role}</p>
                  </div>
                  <a
                    onClick={() =>
                      logPageVisit({
                        page: "council",
                        external_url: member.email,
                        props: {
                          kind: "council_member",
                          member_id: member.id,
                        },
                      })
                    }
                    href={
                      "mailto:" +
                      member.email +
                      "?" +
                      new URLSearchParams({
                        subject: "Anfrage an Lernendenorganisation",
                      }).toString()
                    }
                    className="flex w-12 h-12 int-btn--blue"
                  >
                    <img src={EmailPositive} alt="Email" />
                  </a>
                </div>
                <p className="mt-2">{member.description}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <div className="flex flex-col flex-1 gap-4 md:flex-row">
        <Panel
          color="negative"
          title="Sitzungen"
          error={errors.meetings}
          className="flex-1"
          loading={!loadingStates.meetings}
        >
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              data-ended={meeting.ended}
              className="flex px-4 flex-col md:flex-row py-3 mt-2 items-center rounded-xl bg-brand-theme data-[ended=true]:bg-secondary text-white data-[ended=true]:text-black group"
            >
              <div className="flex-1 w-full">
                {!meeting.ended && (
                  <p className="opacity-60">
                    {getRelativeTime(new Date(meeting.date))}
                  </p>
                )}
                <div className="gap-2 font-medium md:flex">
                  {meeting.ended && (
                    <p>
                      <span className="text-white group-data-[ended=true]:text-brand-theme">
                        {new Date(meeting.date).toLocaleString("de-ch", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}{" "}
                      </span>
                    </p>
                  )}
                  <p>{meeting.title}</p>
                </div>
                {meeting.ended && (
                  <p className="opacity-50">{meeting.summary}</p>
                )}
              </div>
              {meeting.ended ? (
                <a
                  onClick={() =>
                    logPageVisit({
                      page: "council",
                      external_url: meeting.protocol_link,
                      props: {
                        kind: "meeting_protocol",
                        meeting_id: meeting.id,
                      },
                    })
                  }
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-2 w-full md:w-fit md:mt-0"
                  href={meeting.protocol_link}
                >
                  <button className="w-full int-btn--red">Protokoll</button>
                </a>
              ) : (
                <a
                  onClick={() =>
                    logPageVisit({
                      page: "council",
                      external_url: meeting.link,
                      props: {
                        kind: "meeting_join",
                        meeting_id: meeting.id,
                      },
                    })
                  }
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-2 w-full md:mt-0 md:w-fit"
                  href={meeting.link}
                >
                  <button className="w-full int-btn--red">
                    Meeting beitreten
                  </button>
                </a>
              )}
            </div>
          ))}
        </Panel>
        <Panel
          color="negative"
          title="Kommissionen"
          className="flex-1"
          loading={!loadingStates.commissions}
          error={errors.commissions}
        >
          {commissions.map((commission) => {
            const members = commission.expand
              ? commission.expand.commission_members_via_commission
              : [];
            const leader = members.find(
              (member) => member.id === commission.leader
            );
            return (
              <div
                key={commission.id}
                className="flex flex-col gap-4 justify-between items-center px-4 py-3 mt-2 rounded-xl md:flex-row bg-secondary"
              >
                <div className="flex-1">
                  <p className="font-medium">{commission.name}</p>
                  <p className="whitespace-pre-wrap opacity-50">
                    {commission.description}
                  </p>
                </div>

                <div className="flex gap-4 justify-between items-center w-full md:w-fit">
                  <div className="flex ml-3 min-w-10">
                    {members.map((member) => (
                      <img
                        key={member.id}
                        title={member.name}
                        data-is-leader={commission.leader === member.id}
                        className="-ml-3 h-10 w-10 rounded-full transition-transform cursor-pointer hover:scale-125 hover:z-10 border-brand-theme data-[is-leader=true]:border-2"
                        src={pb.getFileUrl(member, member.image, {
                          thumb: "100x100",
                        })}
                      />
                    ))}
                    {commission.expand.contribute_post && (
                      <button
                        onClick={() =>
                          navigate(
                            "news",
                            undefined,
                            formatBlogPostUrl({
                              id: commission.expand.contribute_post!.id,
                              slug:
                                commission.expand.contribute_post?.title || "",
                            })
                          )
                        }
                        className="flex justify-center items-center -ml-3 w-10 h-10 font-bold rounded-full border-2 transition-transform cursor-pointer border-brand-theme bg-brand-theme-shade hover:z-10 hover:scale-125 text-brand-theme"
                      >
                        +
                      </button>
                    )}
                  </div>

                  <a
                    onClick={() =>
                      logPageVisit({
                        page: "council",
                        external_url: leader?.email,
                        props: {
                          kind: "commission_contact",
                          commission_id: commission.id,
                        },
                      })
                    }
                    href={
                      "mailto:" +
                      leader?.email +
                      "?" +
                      new URLSearchParams({
                        subject:
                          "Anfrage an Lernendenorganisation (" +
                          commission.name +
                          ")",
                        cc: members
                          .filter((member) => member.id !== commission.leader)
                          .map((member) => member.email)
                          .join(","),
                      }).toString()
                    }
                    className="flex gap-4 items-center w-12 h-12 int-btn--red"
                  >
                    <img
                      className="w-12 h-12"
                      src={EmailNegative}
                      alt="Email"
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </Panel>
      </div>
    </main>
  );
};

export default Council;
