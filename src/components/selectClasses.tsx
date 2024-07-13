import { useEffect, useState } from "react";
import { UserType } from "../App";
import Delete from "../assets/delete.svg";
import { pb } from "../pb";

function ClassSelectorComponent({ user }: { user: UserType }) {
  const [newClass, setNewClass] = useState("");
  const [userClasses, setUserClasses] = useState<string[]>(
    user.userSelectedClasses ?? []
  );

  const [availableClasses, setAvailableClasses] = useState<string[]>([]);
  const filteredClasses = availableClasses
    .filter(
      (availableClass) =>
        availableClass.toLowerCase().includes(newClass.toLowerCase()) &&
        !(userClasses ?? [])?.includes(availableClass)
    )
    .slice(0, 7);

  useEffect(() => {
    fetch(pb.buildUrl("/api/proxy/classes"))
      .then((resp) => resp.text())
      .then((resp) => {
        setAvailableClasses(
          resp.split("\n").sort((a, b) => b.localeCompare(a))
        );
      });
  }, []);

  return (
    <div className="flex flex-col gap-2 min-w-48">
      <p className="text-sm opacity-50">
        Hier können Sie die sichtbaren Klassen einrichten. Die oberste Klasse
        hat oberste Priorität.
      </p>
      <div className="relative">
        <input
          value={newClass}
          onChange={({ target }) => setNewClass(target.value)}
          type="text"
          placeholder="Neue Klasse (z.B. MED20a)"
          className="px-2 w-32 w-full h-10 rounded-md border-2 border-brand-theme bg-brand-theme-shade"
        />
        <div
          data-visible={newClass.length > 0}
          className="flex absolute flex-wrap gap-2 p-2 w-full bg-white rounded-lg opacity-0 pointer-events-none data-[visible=true]:opacity-100 data-[visible=true]:pointer-events-auto drop-shadow-lg"
        >
          {filteredClasses.length ? (
            filteredClasses.map((availableClass, i) => (
              <button
                key={i}
                onClick={() => {
                  pb.collection("users")
                    .update<UserType>(
                      user.id,
                      {
                        userSelectedClasses: [
                          availableClass,
                          ...(userClasses ?? []),
                        ],
                      },
                      { fields: "userSelectedClasses" }
                    )
                    .then(({ userSelectedClasses }) =>
                      setUserClasses(userSelectedClasses ?? [])
                    );
                  setNewClass("");
                }}
                className="int-btn--blue"
              >
                {availableClass}
              </button>
            ))
          ) : (
            <p className="text-gray-400">Keine Klasse gefunden.</p>
          )}
        </div>
      </div>
      {userClasses?.map((c, i) => (
        <div className="flex justify-between items-center rounded-lg" key={i}>
          <p className="">{c}</p>
          <button
            className="p-1.5 rounded-lg border-2 bg-brand-theme-shade border-brand-theme text-brand-theme"
            onClick={() => {
              pb.collection("users")
                .update<UserType>(
                  user.id,
                  {
                    userSelectedClasses: userClasses.filter(
                      (item) => item !== c
                    ),
                  },
                  { fields: "userSelectedClasses" }
                )
                .then(({ userSelectedClasses }) =>
                  setUserClasses(userSelectedClasses ?? [])
                );
            }}
          >
            <img className="w-4 h-4" src={Delete} alt="Delete" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default ClassSelectorComponent;
