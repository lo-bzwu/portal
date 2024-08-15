import { useEffect, useMemo, useState } from "react";
import Panel from "../components/panel";
import ChevronLeft from "../assets/chevron-left-blue.svg";
import ChevronRight from "../assets/chevron-right-blue.svg";

import { UserType } from "../App";
import { pb } from "../pb";
import ClassSelectorComponent from "../components/selectClasses";

function getSubjectName(code: string, classes: Record<string, string>): string {
  let lookup = classes[code];
  if (!lookup) return code;
  if (lookup[0] === "(") lookup = lookup.slice(lookup.indexOf(" ")).trim();
  if (!lookup) return code;
  return lookup;
}

function makeDateString(date: Date) {
  return (
    date.getFullYear() +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    date.getDate().toString().padStart(2, "0")
  );
}

function Timetable({ user }: { user: UserType }) {
  const [selectedDay, setDay] = useState(new Date());
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const userClasses = useMemo(
    () => user.userSelectedClasses ?? [],
    [user.userSelectedClasses]
  );

  const [data, setData] = useState<{
    teachers: Record<string, { first_name: string; last_name: string }>;
    subjects: Record<string, string>;
    rooms: Record<string, string>;
    timeslots: {
      start_time: string;
      end_time: string;
    }[];
    result: {
      code: string;
      label: string;
      occurrences: {
        subject: string;
        teachers: string[];
        rooms: string[];
        classes: string[];
        start_time: string;
        end_time: string;
        dates: string[];
        change:
          | "room_change"
          | "lesson_change"
          | "teacher_absence"
          | "class_absence"
          | "unknown";
      }[];
    }[];
  }>({ result: [], rooms: {}, subjects: {}, teachers: {}, timeslots: [] });

  const isTeacher = useMemo(
    () => user.isLocalTenant && !user.isLocalStudent,
    [user.isLocalStudent, user.isLocalTenant]
  );

  useEffect(() => {
    if (!isTeacher && !userClasses.length) {
      setError(
        `Da du keine Klassen ausgewählt hast, können keine Stundenplandaten angezeigt werden.\nKlicke auf "Klassen verwalten", um Lektionen zu sehen.`
      );
      return;
    }

    const refresh = (initial = false) => {
      fetch(
        pb.buildUrl("/api/proxy/lessons") +
          "?" +
          new URLSearchParams(
            isTeacher
              ? {
                  teachers: isTeacher ? user.teacherCode : "",
                }
              : {
                  classes: isTeacher ? "" : (userClasses ?? []).join(","),
                }
          ).toString()
      )
        .then((r) => r.json())
        .then((data) => {
          setLoading(false);
          setData({ ...data, result: data.result ?? [] });
          setError(null);
        })
        .catch(initial ? setError : undefined);
    };

    refresh();
    const interval = setInterval(refresh, 1000 * 60 * 10);

    setInterval(() => {
      const now = new Date();
      setDay((selectedDay) => {
        selectedDay.setHours(now.getHours());
        selectedDay.setMinutes(now.getMinutes());
        return window.structuredClone(selectedDay);
      });
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, [userClasses, isTeacher, user.teacherCode]);

  const weekday = useMemo(() => selectedDay.getDay(), [selectedDay]);
  const dateString = useMemo(() => makeDateString(selectedDay), [selectedDay]);
  const isToday = useMemo(
    () => makeDateString(selectedDay) === makeDateString(new Date()),
    [selectedDay]
  );

  const nextLesson = useMemo(() => {
    const currentDate = parseInt(dateString);
    const nextLesson = data.result.reduce((acc, curr) => {
      let earliestDate = Infinity;
      for (const occurrence of curr.occurrences) {
        for (const date of occurrence.dates) {
          const parsed = parseInt(date);
          if (parsed > currentDate && parsed < earliestDate)
            earliestDate = parsed;
        }
      }
      if (earliestDate < acc) return earliestDate;
      return acc;
    }, Infinity);
    if (isFinite(nextLesson)) return nextLesson.toString();
    return null;
  }, [dateString, data]);

  const selectedDayOccurrences = useMemo(() => {
    return (data.result ?? []).reduce<
      (typeof data)["result"][number]["occurrences"]
    >(
      (acc, curr) => [
        ...acc,
        ...curr.occurrences
          .filter((occurrence) => occurrence.dates.includes(dateString))
          .map((occurrence) => ({
            ...occurrence,
          })),
      ],
      []
    );
  }, [data, dateString]);

  const now = new Date();
  console.log("rerendered");

  return (
    <Panel
      loading={loading}
      title="Stundenplan"
      color="positive"
      error={error}
      actionLabel={isTeacher ? "" : "Klassen verwalten"}
      actionLabelClassName="int-btn--blue"
      popup={!isTeacher ? <ClassSelectorComponent user={user} /> : false}
    >
      <div className="flex justify-between items-center mt-2">
        <button
          className="transition-all int-btn--blue disabled:pointer-events-none disabled:opacity-50"
          onClick={() =>
            setDay((wd) => new Date(wd.getTime() - 24 * 60 * 60 * 1000))
          }
        >
          <img src={ChevronLeft} alt="left" />
        </button>

        <p className="text-brand-theme">
          {
            [
              "Sonntag",
              "Montag",
              "Dienstag",
              "Mittwoch",
              "Donnerstag",
              "Freitag",
              "Samstag",
            ][weekday]
          }
          , {selectedDay.toLocaleDateString("de-ch")}
        </p>

        <button
          className="transition-all int-btn--blue disabled:pointer-events-none disabled:opacity-50"
          onClick={() =>
            setDay((wd) => new Date(wd.getTime() + 24 * 60 * 60 * 1000))
          }
        >
          <img src={ChevronRight} alt="right" />
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-4 w-full">
        {selectedDayOccurrences.length === 0 ? (
          <div className="p-4 rounded-lg text-brand-theme bg-brand-theme-shade">
            <p>
              {data.result.length === 0
                ? `Im Stundenplan wurden keine Lektionen gefunden. ${
                    isTeacher
                      ? `Falls Ihr Kürzel nicht "${user.teacherCode}" ist, bitten wenden Sie sich an den Support des LO-Portals.`
                      : `Bitte überprüfe die ausgewählten Klassen unter "Klassen verwalten".`
                  }`
                : `Am ausgewählten Tag ${
                    isTeacher ? "geben Sie" : "hast du"
                  } keine Lektionen.`}
            </p>
            {nextLesson !== null && (
              <button
                className="mt-2 w-full bg-white int-btn--blue"
                onClick={() =>
                  setDay(
                    new Date(
                      parseInt(nextLesson.slice(0, 4)),
                      parseInt(nextLesson.slice(4, 6)) - 1,
                      parseInt(nextLesson.slice(6, 8))
                    )
                  )
                }
              >
                Zur nächsten Lektion
              </button>
            )}
          </div>
        ) : (
          data.timeslots.map((timeslot, i) => {
            const current_timeslot = parseInt(
              now.getHours().toString() +
                now.getMinutes().toString().padStart(2, "0")
            );

            const occurrence = selectedDayOccurrences.find(
              (slot) => timeslot.start_time === slot.start_time
            );
            const isTimeslotActive =
              current_timeslot >= parseInt(timeslot.start_time) &&
              current_timeslot <= parseInt(timeslot.end_time) &&
              isToday;

            const endDate = window.structuredClone(now);
            const end_hours = parseInt(timeslot.end_time.slice(0, 2));
            const end_minutes = parseInt(timeslot.end_time.slice(2));
            endDate.setHours(end_hours);
            endDate.setMinutes(end_minutes);
            const diff_minutes = Math.floor(
              (endDate.getTime() - now.getTime()) / 1000 / 60
            );

            if (!occurrence)
              return (
                <div
                  key={i}
                  data-active={isTimeslotActive}
                  className="h-4 data-[active=true]:h-7 text-brand-positive text-center data-[active=true]:border-2 data-[active=true]:border-brand-theme data-[active=true]:bg-brand-theme-shade  rounded-full"
                >
                  {isTimeslotActive &&
                    "Pause - noch " + diff_minutes + " Minuten"}
                </div>
              );
            return (
              <div
                data-active={isTimeslotActive}
                data-change={occurrence.change}
                // data-change={"room_change"}
                className="flex overflow-x-auto gap-2 group"
                key={i}
              >
                <div className="flex-1 px-4 py-2 w-full rounded-xl bg-secondary group-data-[active=true]:bg-brand-theme group-data-[active=true]:text-white group-data-[change]:border-2 border-brand-theme">
                  <div className="flex gap-4 justify-between opacity-100">
                    <p
                      data-active={isTimeslotActive}
                      className="whitespace-nowrap group-data-[change=teacher_absence]:underline opacity-30 data-[active=true]:opacity-60"
                    >
                      {isTeacher
                        ? occurrence.classes?.join(",") +
                          (occurrence.teachers.length > 0
                            ? " mit " +
                              occurrence.teachers
                                .map(
                                  (teacher) => data.teachers[teacher].first_name
                                )
                                .join(", ")
                            : "")
                        : occurrence.teachers
                            .map(
                              (teacher) =>
                                data.teachers[teacher][
                                  isTeacher ? "first_name" : "last_name"
                                ]
                            )
                            .join(", ")}{" "}
                    </p>
                    <p
                      title={data.rooms[occurrence.rooms.join(", ")]}
                      data-active={isTimeslotActive}
                      className={
                        'overflow-hidden text-right overflow-ellipsis whitespace-nowrap group-data-[change="room_change"]:underline opacity-30 data-[active=true]:opacity-100'
                      }
                    >
                      {isTimeslotActive
                        ? "noch " + diff_minutes + "m"
                        : occurrence.rooms.join(", ")}
                    </p>
                  </div>
                  <div className="flex gap-2.5">
                    <p className="text-brand-theme group-data-[active=true]:text-white">
                      {occurrence.start_time.slice(0, 2)}:
                      {occurrence.start_time.slice(2, 4)}
                    </p>
                    <p
                      className="group-data-[change=lesson_change]:underline"
                      title={data.subjects[occurrence.subject]}
                    >
                      {getSubjectName(occurrence.subject, data.subjects)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Panel>
  );
}

export default Timetable;
