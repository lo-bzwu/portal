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
  locations: string[];
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

export type UseNagivationFunc = (
  page: keyof typeof pages,
  params?: Record<string, string>,
  suffix?: string
) => { url: string; do: () => void };

function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [user, setUser] = useState<null | UserType>(
    pb.authStore.record ? (pb.authStore.record as unknown as UserType) : null
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
        if (data.action === "delete") {
          setUser(null);
          return;
        }
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
          console.log("auth complete", model);
          startWatching(model.record.id);
          setUser(model.record);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (pb.authStore.record) {
      startWatching(pb.authStore.record.id);
      setUser(pb.authStore.record as unknown as UserType);

      // skip auth refresh on dev
      if (import.meta.env.DEV) return;
      pb.collection("users")
        .authRefresh<UserType>()
        .then((updatedUser) => {
          const user = updatedUser.record;
          if (!user) {
            setUser(null);
            pb.authStore.clear();
            return;
          }
          setUser(user);
        })
        .catch((error) => {
          console.error("auth refresh failed", error);
          setUser(null);
          pb.authStore.clear();
          return;
        });
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
        handleSave={(newTeacherCode, locations, userSelectedClasses) => {
          setUser((u) => {
            if (!u) return u;
            return {
              ...u,
              introComplete: true,
              teacherCode: newTeacherCode,
              userSelectedClasses: userSelectedClasses,
              locations,
            };
          });
        }}
      />
    );
  }

  const _generatePageURL = (
    page: keyof typeof pages,
    params: Record<string, string> = {},
    suffix = ""
  ): { title: string; url: string } => {
    const paramString = new URLSearchParams(params).toString();
    return {
      title: pages[page].title,
      url:
        pages[page].url +
        (paramString.length ? "?" + paramString : "") +
        suffix,
    };
  };

  const goToPage: NavigateFunc = (
    page: keyof typeof pages,
    params: Record<string, string> = {},
    suffix = ""
  ) => {
    const { title, url } = _generatePageURL(page, params, suffix);
    window.history.pushState(page, title, url);
    document.title = pages[page].title;
    setPage(page);
    setTimeout(() => logPageVisit({ page, props: params, suffix }));
  };

  // const useNavigation = (
  //   page: keyof typeof pages,
  //   params: Record<string, string>,
  //   suffix?: string
  // ) => ({
  //   url: _generatePageURL(page, params, suffix),
  //   do: () => goToPage(page, params, suffix),
  // });

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
      {page === "council" && <Council navigate={goToPage} />}
      {page === "contribute" && <Contribute user={user} />}
      {page === "news" && <News navigate={goToPage} />}
    </div>
  );
}

export default App;
