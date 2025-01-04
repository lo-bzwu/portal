import { useEffect, useState } from "react";
import Panel from "../components/panel";
import ChevronLeft from "../assets/chevron-left-red.svg";
import ChevronRight from "../assets/chevron-right-red.svg";
import Warning from "../assets/warning.svg";
import { pb } from "../pb";

interface MenuState {
  menus: {
    text: string;
    price: { currency: string; price: number };
    type: string;
    weekday: number;
  }[];
  extensions: {
    title: string;
    items: {
      text: string;
      price: { currency: string; price: number };
    }[];
  }[];
}

function Menus() {
  const [weekday, setWeekday] = useState(
    (() => {
      const weekday = new Date().getDay();
      if (weekday === 0) return 6;
      else if (weekday === 6) return 6;
      return weekday;
    })()
  );
  const [data, setData] = useState<MenuState>({
    menus: [],
    extensions: [],
  });
  const [errors, setErrors] = useState<Record<number, string>>({});

  useEffect(() => {
    fetch(pb.buildURL("/api/proxy/menus/current.json"))
      .then((r) => r.json())
      .then((data) => {
        const result: MenuState = { menus: [], extensions: [] };
        if (data.ok) {
          const now = new Date();
          const weekday = now.getDay();
          // snap to monday of first week if the menu was updated recently (likely on friday), otherwise monday of next week will be used
          if (
            (weekday === 0 || weekday === 6 || weekday === 5) &&
            data.updated_at &&
            (now.getTime() - data.updated_at * 1000) / 1000 / 60 / 60 / 24 < 3
          )
            setWeekday(1);
          result.menus = data.menus;
          result.extensions = data.extensions;
          setData(result);
        } else {
          setErrors((prev) => {
            for (let i = 1; i <= 5; i++) {
              prev[i] = data.message ?? "Kein Menu für diesen Tag gefunden.";
            }
            return { ...prev };
          });
        }
        fetch(pb.buildURL("/api/proxy/menus/next.json"))
          .then((r) => r.json())
          .then((next) => {
            if (next.ok) {
              result.menus = [
                ...result.menus,
                ...next.menus.map((menu: { weekday: number }) => ({
                  ...menu,
                  weekday: menu.weekday + 5,
                })),
              ];
              if (!data.ok) result.extensions = next.extensions;
              setData({ ...result });
            } else {
              setErrors((prev) => {
                for (let i = 1; i <= 5; i++) {
                  prev[i + 5] =
                    next.message ?? "Kein Menu für diesen Tag gefunden.";
                }
                return { ...prev };
              });
            }
          });
      });
  }, []);

  return (
    <Panel
      title="Menu der Mensa"
      color="negative"
      // loading={data.menus.length === 0 && Object.keys(errors).length === 0}
    >
      <div className="flex justify-between items-center mt-2">
        <button
          disabled={weekday <= 1}
          className="transition-all int-btn--red disabled:pointer-events-none disabled:opacity-50"
          onClick={() => setWeekday((wd) => wd - 1)}
        >
          <img src={ChevronLeft} alt="left" />
        </button>

        <p className="text-brand-theme">
          {
            ["Freitag", "Montag", "Dienstag", "Mittwoch", "Donnerstag"][
              weekday % 5
            ]
          }
          {weekday > 5 && ", nächste Woche"}
        </p>

        <button
          disabled={weekday >= 10}
          className="transition-all int-btn--red disabled:pointer-events-none disabled:opacity-50"
          onClick={() => setWeekday((wd) => wd + 1)}
        >
          <img src={ChevronRight} alt="right" />
        </button>
      </div>
      <div className="flex flex-col gap-2 mt-4 w-full">
        {errors[weekday] ? (
          <div className="flex flex-col gap-2 justify-center p-4 w-full rounded-xl bg-brand-theme-shade text-brand-theme">
            <img className="h-8" src={Warning} alt="warning sign" />
            <p className="w-full text-left whitespace-pre-wrap">
              {errors[weekday]}
            </p>
          </div>
        ) : (
          <>
            {data.menus
              .filter((menu) => menu.weekday === weekday)
              .map((menu, i) => (
                <div className="p-2 px-4 rounded-xl bg-secondary" key={i}>
                  <div className="flex justify-between font-bold">
                    <p className="font-normal opacity-30">
                      {
                        {
                          fast_lane: "Fast Lane",
                          daily_favourites: "Daily Favourites",
                          lifestyle: "Lifestyle",
                        }[menu.type]
                      }
                    </p>
                    <p className="whitespace-nowrap text-brand-theme">
                      {menu.price
                        ? menu.price.currency +
                          " " +
                          menu.price.price.toFixed(2)
                        : "?"}
                    </p>
                  </div>
                  <p>{menu.text}</p>
                </div>
              ))}
            {data.extensions.map((menu, i) => (
              <div className="p-2 px-4 rounded-xl bg-secondary" key={i}>
                <p className="font-normal opacity-30">{menu.title}</p>
                {menu.items.map((item, ii) => (
                  <div className="flex justify-between" key={i + "-" + ii}>
                    <p>{item.text}</p>
                    <p className="font-semibold whitespace-nowrap text-brand-theme">
                      {item.price.currency} {item.price.price.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    </Panel>
  );
}

export default Menus;
