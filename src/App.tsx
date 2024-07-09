import Logo from "./assets/logo.svg";
import Burger from "./assets/burger.svg";
import { pb } from "./pb";
import { useEffect, useState } from "react";
import Home from "./pages/home";
import Topics from "./pages/topics";
import Council from "./pages/council";
import Contribute from "./pages/contribute";
import News from "./pages/news";
import Intro from "./pages/intro";
import Setup from "./pages/setup";
import logPageVisit from "./utils/reportPageVisit";

export interface UserType {
  classes?: string[];
  email: string;
  emailVisibility: boolean;
  firstName: string;
  id: string;
  isLocalStudent: boolean;
  isLocalTenant: boolean;
  lastName: string;
  updated: string;
  collectionId: string;
  teacherCode: string;
  userSelectedClasses?: string[];
  username: string;
  verified: boolean;
  introComplete: boolean;
}

const pages = {
  home: {
    url: "/",
    title: "BZWU LO",
  },
  topics: {
    url: "/topics",
    title: "Themen | BZWU LO",
  },
  council: {
    url: "/council",
    title: "Gremien | BZWU LO",
  },
  contribute: {
    url: "/contribute",
    title: "Mitmachen | BZWU LO",
  },
  news: {
    url: "/news",
    title: "News | BZWU LO",
  },
};

export type NavigateFunc = (
  page: keyof typeof pages,
  params?: Record<string, string>,
  suffix?: string
) => void;

function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [user, setUser] = useState<null | UserType>(
    pb.authStore.model as UserType
  );
  const [page, setPage] = useState(
    (() => {
      const path = window.location.pathname;
      if (path.startsWith("/topics")) return "topics";
      if (path.startsWith("/council")) return "council";
      if (path.startsWith("/news")) return "news";
      if (path.startsWith("/contribute")) return "contribute";
      return "home";
    })()
  );
  const [loginUrl, setLoginUrl] = useState<null | string>(null);

  useEffect(() => {
    logPageVisit({
      page: page as keyof typeof pages,
      props: {
        ...Object.fromEntries(
          new URLSearchParams(window.location.search).entries()
        ),
        isInitialLoad: true,
      },
    });

    let unsubscribeFunc = () => {};

    function startWatching(id: string) {
      pb.collection("users").subscribe<UserType>(id, (data) => {
        if (data.action !== "update") return;
        pb.collection("users").authRefresh();

        setUser(data.record);
      });
      unsubscribeFunc = () => pb.collection("users").unsubscribe(id);
    }

    if (!pb.authStore.isValid) {
      pb.collection("users")
        .authWithOAuth2<UserType>({
          provider: "microsoft",
          urlCallback: (url) => {
            setLoginUrl(url);
          },
        })
        .then((model) => {
          startWatching(model.record.collectionId);
          setUser(model.record);
        });
    } else {
      startWatching(pb.authStore.model?.id);
      setUser(pb.authStore.model as UserType);

      // pb.collection("users")
      //   .authRefresh()
      //   .catch(() => {
      //     pb.authStore.clear();
      //     window.location.reload();
      //   });
    }

    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      setPage(e.state);
    });

    return () => unsubscribeFunc();
  }, []);

  if (!user)
    return (
      <Intro
        setUser={setUser}
        login={() => {
          if (!loginUrl) return;
          window.open(loginUrl, "_blank", "");
        }}
      />
    );
  else if (!user.introComplete) {
    return (
      <Setup
        user={user}
        handleSave={() => {
          setUser((u) => {
            if (!u) return u;
            return { ...u, introComplete: true };
          });
        }}
      />
    );
  }

  const goToPage = (
    page: keyof typeof pages,
    params: Record<string, string> = {},
    suffix = ""
  ) => {
    const paramString = new URLSearchParams(params).toString();
    window.history.pushState(
      page,
      pages[page].title,
      pages[page].url + (paramString.length ? "?" + paramString : "") + suffix
    );
    document.title = pages[page].title;
    setPage(page);
    setTimeout(() => logPageVisit({ page, props: params, suffix }));
  };

  const buttons = (
    <>
      <button
        className="btn"
        onClick={() => goToPage("home")}
        data-active={page === "home"}
      >
        Home
      </button>
      <button
        className="btn"
        onClick={() => goToPage("topics")}
        data-active={page === "topics"}
      >
        Themen
      </button>
      <button
        data-active={page === "council"}
        onClick={() => goToPage("council")}
        className="btn"
      >
        Gremium
      </button>
      <button
        onClick={() => goToPage("contribute")}
        className="btn"
        data-active={page === "contribute"}
        data-highlight="true"
      >
        Beitragen
      </button>
    </>
  );

  return (
    <div className="flex flex-col p-4 w-full xl:p-8 md:p-5 md:h-full bg-secondary">
      <nav className="flex flex-col px-6 py-1 w-full rounded-2xl bg-primary h-fit">
        <div className="flex gap-8 items-center w-full">
          <a
            href="/"
            className="flex gap-4 items-center py-4"
            onClick={(event) => {
              event.preventDefault();
              goToPage("home");
            }}
          >
            <img className="h-10" src={Logo} alt="Logo der LO" />
            <div>
              <p className="md:text-3xl">BZWU Lernendenorganisation</p>
              <p className="opacity-50 md:text-lg">
                <span className="inline md:hidden">
                  {pb.authStore.model?.firstName} {pb.authStore.model?.lastName}
                </span>
              </p>
            </div>
          </a>
          <div className="flex flex-1 justify-end md:hidden">
            <button
              className="w-12 h-12 int-btn--blue"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              <img src={Burger} className="" />
            </button>
          </div>
          <div className="hidden flex-1 gap-4 justify-end items-center md:flex">
            {buttons}
          </div>
        </div>
        <div
          onClick={() => setIsMobileNavOpen(false)}
          aria-expanded={isMobileNavOpen}
          className="hidden flex-col gap-2 pb-4 w-full aria-expanded:mt-4 aria-expanded:flex"
        >
          {buttons}
        </div>
      </nav>
      {page === "home" && <Home navigate={goToPage} user={user} />}
      {page === "topics" && <Topics />}
      {page === "council" && <Council />}
      {page === "contribute" && <Contribute user={user} />}
      {page === "news" && <News navigate={goToPage} />}
    </div>
  );
}

export default App;
