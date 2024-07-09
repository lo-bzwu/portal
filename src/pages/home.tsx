import Blogs from "../parts/blogs";
import Links from "../parts/links";
import Menus from "../parts/menus";
import Timetable from "../parts/timetable";
import Topics from "../parts/topics";
import type { UserType, NavigateFunc } from "../App";

const Home = ({
  user,
  navigate,
}: {
  user: UserType;
  navigate: NavigateFunc;
}) => (
  <main className="grid overflow-hidden flex-1 gap-4 mt-4 md:grid-cols-4">
    <Timetable user={user} />
    <Menus />
    <Blogs
      userClasses={user.userSelectedClasses}
      openPost={(id, slug) =>
        navigate("news", undefined, "/" + id + "-" + slug)
      }
    />
    <div className="flex overflow-hidden flex-col gap-4 h-full">
      <Topics
        onContributionOptionClicked={(option) =>
          navigate("news", undefined, "/" + option.post + "-" + option.slug)
        }
        onTopicClicked={(id) => navigate("topics", { topic: id })}
      />
      <Links
        userId={user.id}
        classes={user.userSelectedClasses ?? []}
        isTeacher={user.isLocalTenant && !user.isLocalStudent}
      />
    </div>
  </main>
);

export default Home;
