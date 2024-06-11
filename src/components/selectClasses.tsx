import { useEffect, useState } from "react";
import { UserType } from "../App";
import Delete from "../assets/delete.svg";
import Create from "../assets/create.svg";
import { pb } from "../pb";

function ClassSelectorComponent({ user }: { user: UserType }) {
  const [newClass, setNewClass] = useState("");
  const [userClasses, setUserClasses] = useState(user.userSelectedClasses);

  const [availableClasses, setAvailableClasses] = useState<string[]>([]);

  useEffect(() => {
    fetch(pb.buildUrl("/api/proxy/classes"))
      .then((resp) => resp.text())
      .then((resp) => {
        setAvailableClasses(resp.split("\n"));
      });
  }, []);

  return (
    <div className="flex flex-col gap-2 min-w-48">
      <p className="text-sm opacity-50">
        Hier können Sie die sichtbaren Klassen einrichten. Die oberste Klasse
        hat oberste Priorität.
      </p>
      {userClasses.map((c, i) => (
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
                  setUserClasses(userSelectedClasses)
                );
            }}
          >
            <img className="w-4 h-4" src={Delete} alt="Delete" />
          </button>
        </div>
      ))}
      <div className="flex gap-2">
        <input
          value={newClass}
          onChange={({ target }) => setNewClass(target.value)}
          type="text"
          placeholder="Neue Klasse (z.B. MED20a)"
          className="px-2 w-32 w-full rounded-md border-2 border-brand-theme bg-brand-theme-shade"
        />
        <button
          onClick={() => {
            const correctedClass = availableClasses.find(
              (ac) => ac.toLowerCase() === newClass.toLowerCase()
            );
            if (!correctedClass) return alert("Klasse nicht gefunden.");
            pb.collection("users")
              .update<UserType>(
                user.id,
                {
                  userSelectedClasses: [...userClasses, correctedClass],
                },
                { fields: "userSelectedClasses" }
              )
              .then(({ userSelectedClasses }) =>
                setUserClasses(userSelectedClasses)
              );
            setNewClass("");
          }}
          className="p-2 rounded-md border-2 border-brand-theme text-brand-theme bg-brand-theme-shade"
        >
          <img className="w-4 h-4" src={Create} alt="Create" />
        </button>
      </div>
    </div>
  );
}

export default ClassSelectorComponent;
