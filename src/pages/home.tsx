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
      openPost={(id, slug) =>
        navigate("news", undefined, "/" + id + "-" + slug)
      }
    />
    <div className="flex overflow-hidden flex-col gap-4 h-full">
      <Topics onTopicClicked={(id) => navigate("topics", { topic: id })} />
      <Links classes={user.userSelectedClasses} />
    </div>
  </main>
);

export default Home;
