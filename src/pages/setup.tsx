import { useMemo, useState } from "react";
import type { UserType } from "../App";
import Panel from "../components/panel";
import ClassSelectorComponent from "../components/selectClasses";
import { pb } from "../pb";

const Setup = ({
  user,
  handleSave,
}: {
  user: UserType;
  handleSave: () => void;
}) => {
  const completeSetup = () => {
    pb.collection<UserType>("users")
      .update<UserType>(user.id, {
        introComplete: true,
        teacherCode: newShortCode,
        locations: selectedLocations,
      })
      .then(() => handleSave());
  };

  const [selectedLocations, setSelectedLocations] = useState<
    (typeof locations)[number][]
  >(["Wil"]);
  const [newShortCode, setNewShortCode] = useState(user.teacherCode);
  const locations = ["Wil", "Uzwil", "Flawil"] as const;

  const isTeacher = useMemo(
    () => user.isLocalTenant && !user.isLocalStudent,
    [user.isLocalStudent, user.isLocalTenant]
  );

  return (
    <main className="flex overflow-hidden justify-center items-center p-8 md:h-full">
      <div className="flex flex-col gap-4 w-full max-w-screen-sm h-fit md:w-fit">
        <Panel
          title="Account einrichten"
          color="positive"
          className="max-w-screen-md"
        >
          <p className="my-2">
            Um {isTeacher ? "Ihnen" : "dir"} Inhalte (z.B.{" "}
            {isTeacher ? "Stundenplan" : "hilfreiche Links"}) spezifisch für{" "}
            {isTeacher ? "Ihre Lektionen" : "deine Klassen"} und Standorte am
            BZWU anzuzeigen,
            {isTeacher
              ? " brauchen wir noch ein paar Informationen."
              : " teile uns bitte mit, welche Klassen du besuchst."}
          </p>

          <div className="flex flex-col gap-2 mt-8 md:flex-row">
            <div className="flex-1 p-4 rounded-lg bg-secondary">
              {!isTeacher ? (
                <>
                  <p className="font-bold">Klassen hinzufügen</p>
                  <ClassSelectorComponent user={user} />
                </>
              ) : (
                <>
                  <p className="font-bold">Kürzel anpassen</p>
                  <p>
                    Als Lehrperson werden Ihnen automatisch Ihre Lektionen
                    angezeigt. Falls Ihr Kürzel nicht{" "}
                    <span className="font-bold text-brand-positive">
                      {user.teacherCode}
                    </span>{" "}
                    ist, können Sie es hier anpassen.
                    <input
                      maxLength={4}
                      className="mt-4 input"
                      placeholder="Kürzel"
                      value={newShortCode}
                      onChange={({ target }) => setNewShortCode(target.value)}
                      type="text"
                    />
                  </p>
                </>
              )}
            </div>
            <div className="flex-1 p-4 rounded-lg bg-secondary">
              <p className="font-bold">Standorte auswählen</p>
              <div className="flex flex-col gap-2 mt-2 h-full">
                {locations.map((location, i) => (
                  <button
                    key={i}
                    data-selected={selectedLocations.includes(location)}
                    onClick={() => {
                      if (selectedLocations.includes(location)) {
                        setSelectedLocations([
                          ...selectedLocations.filter(
                            (loc) => loc !== location
                          ),
                        ]);
                      } else {
                        setSelectedLocations([...selectedLocations, location]);
                      }
                    }}
                    className="px-4 py-2 text-left bg-white rounded-lg border-2 hover:bg-brand-positive-shade hover:border-brand-positive data-[selected=true]:bg-brand-positive data-[selected=true]:text-white transition-colors data-[selected=true]:border-transparent"
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            data-highlight={true}
            onClick={completeSetup}
            className="mt-8 w-full btn"
          >
            Speichern
          </button>
        </Panel>
      </div>
    </main>
  );
};

export default Setup;
