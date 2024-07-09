import { useState } from "react";
import type { UserType } from "../App";
import Panel from "../components/panel";
import { pb } from "../pb";

const Contribute = ({ user }: { user: UserType }) => {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="flex justify-center mt-4 w-full h-full">
      <Panel
        title="Beitragen"
        color="positive"
        loading={!loading}
        className="w-full max-w-screen-sm"
      >
        {submitted ? (
          <>
            <div className="p-4 mt-4 rounded-xl bg-brand-theme-shade text-brand-theme">
              <p>Die Nachricht wurde erfolgreich übermittelt.</p>
              <p>ID: {submitted}</p>
            </div>
            <button
              className="mt-4 w-full btn"
              data-highlight={true}
              onClick={() => {
                setSubmitted(null);
                setMessage("");
              }}
            >
              Neue Nachricht
            </button>
          </>
        ) : (
          <form
            className="flex flex-col gap-4 mt-4 w-full"
            onSubmit={(event) => {
              event.preventDefault();
              setLoading(true);
              pb.collection("submissions")
                .create({
                  content: message,
                  createdBy: user.id,
                })
                .then((result) => {
                  setSubmitted(result.id);
                })
                .catch((err) => {
                  alert("Fehler:" + err);
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          >
            <p>
              Durch dieses Formular kannst du Kontakt zur LO aufnehmen. Deine
              Nachricht wird vertraulich behandelt. Bei Rückfragen werden wir
              dich per E-Mail kontaktieren.
              <br />
            </p>
            <input
              type="text"
              className="input"
              readOnly
              disabled
              value={user.email}
            />
            <textarea
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              autoFocus
              className="h-full input"
              placeholder="Deine Nachricht..."
              rows={12}
            />
            <button data-highlight={true} className="btn">
              Absenden
            </button>
          </form>
        )}
      </Panel>
    </main>
  );
};

export default Contribute;
