import { useEffect, useRef, useState } from "react";
import Logo from "../assets/logo.svg";
import ChevronRightPositive from "../assets/chevron-right-blue.svg";
import { pb } from "../pb";
import { UserType } from "../App";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const Intro = (props: {
  login: () => void;
  setUser: (u: UserType) => void;
}) => {
  const [faqs, setFaqs] = useState<null | FAQ[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    pb.collection("intro_faq")
      .getFullList<FAQ>({ sort: "order", fields: "id,question,answer" })
      .then((faqs) => setFaqs(faqs));
  }, []);

  const [faqOpen, setFaqOpen] = useState<Record<string, boolean>>({});
  const [authError, setAuthError] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <main
      className="grid place-items-center p-4 w-full h-full bg-secondary"
      style={
        {
          "--brand-theme": "var(--brand-positive)",
          "--brand-theme-shade": "var(--brand-positive-shade)",
        } as React.CSSProperties
      }
    >
      <div
        data-visible={faqs !== null}
        className="flex flex-col gap-4 p-8 max-w-screen-sm rounded-xl bg-primary scale-0 data-[visible=true]:scale-100 transition-transform"
      >
        {isLoading ? (
          <>
            <img className="h-24 animate-spin" src={Logo} alt="Logo der LO" />
            <p className="w-full text-center">Sie werden eingeloggt...</p>
          </>
        ) : (
          <>
            <div className="flex gap-4">
              <img
                data-loading={faqs === null}
                className="h-12 data-[loading=true]:animate-pulse"
                src={Logo}
                alt="Logo der LO"
              />
              <div>
                <p className="text-xl">BZWU Lernendenorganisation</p>
                <p className="opacity-50">Informationsportal</p>
              </div>
            </div>

            <div tabIndex={-1} className="flex overflow-x-hidden w-full">
              <div
                // data-hide={showLogin}
                className="flex flex-col flex-shrink-0 gap-4 w-full  data-[hide=true]:-translate-x-full transition-all data-[hide=true]:invisible"
              >
                <p className="w-full">
                  {faqs?.find((faq) => faq.question === "welcome")?.answer}
                </p>

                <div className="flex flex-col gap-2">
                  {faqs
                    ?.filter((q) => q.question !== "welcome")
                    .map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() =>
                          setFaqOpen({ ...faqOpen, [faq.id]: !faqOpen[faq.id] })
                        }
                        data-open={faqOpen[faq.id] === true ? true : null}
                        className="overflow-hidden p-3 px-4 w-full rounded-lg bg-secondary group"
                      >
                        <div className="flex justify-between">
                          <p className="opacity-50">{faq.question}</p>
                          <img
                            className="rotate-90 group-data-[open]:rotate-0 transition-transform"
                            src={ChevronRightPositive}
                            alt="expand"
                          />
                        </div>
                        <p
                          onClick={(e) => e.stopPropagation()}
                          className="group-data-[open]:mt-2 group-data-[open]:h-fit group-data-[open]:opacity-100 text-left h-0 mt-0 opacity-0 transition-all cursor-text"
                        >
                          {faq.answer}
                        </p>
                      </button>
                    ))}
                </div>
                <div className="flex flex-1 items-end">
                  <button
                    className="w-full btn"
                    data-highlight={true}
                    onClick={() => {
                      props.login();
                      setIsLoading(true);
                      setShowLogin(true);
                    }}
                  >
                    Einloggen
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Intro;
