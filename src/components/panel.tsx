import { useEffect, useRef, useState } from "react";
import Logo from "../assets/logo.svg";
import Warning from "../assets/warning.svg";

function Panel({
  title,
  actionLabel,
  actionLabelClassName,
  color,
  error,
  loading,
  children,
  popup,
  onPopupOpen,
  className,
}: {
  title: string;
  loading?: boolean;
  error?: string | null | Error;
  actionLabel?: string;
  color: "positive" | "negative";
  onPopupOpen?: () => void;
  actionLabelClassName?: string;
  children: React.ReactNode;
  className?: string;
  popup?: React.ReactNode;
}) {
  const [isActionBtnOpen, setIsActionBtnOpen] = useState(false);
  const eventListener = useRef<((event: MouseEvent) => void) | null>(null);

  useEffect(() => {
    if (eventListener.current)
      document.body.removeEventListener("click", eventListener.current);

    if (!isActionBtnOpen) return;

    const popupCloser = (event: MouseEvent) => {
      if ((event.target as HTMLElement)?.classList?.contains("popup-trigger"))
        return;

      setIsActionBtnOpen(false);
      document.removeEventListener("click", popupCloser);
    };

    eventListener.current = popupCloser;
    document.body.addEventListener("click", popupCloser);

    return () => document.body.removeEventListener("click", popupCloser);
  }, [isActionBtnOpen]);

  return (
    <div
      className={
        "overflow-y-auto px-5 py-6 bg-white md:h-full rounded-3xl " + className
      }
      style={
        {
          "--brand-theme":
            color === "positive"
              ? "var(--brand-positive)"
              : "var(--brand-negative)",
          "--brand-theme-shade":
            color === "positive"
              ? "var(--brand-positive-shade)"
              : "var(--brand-negative-shade)",
        } as React.CSSProperties
      }
    >
      <div className="flex justify-between items-center">
        <h4 className="text-2xl text-brand-theme">{title}</h4>
        {actionLabel && (
          <div className="relative">
            <button
              onClick={() => {
                setIsActionBtnOpen(!isActionBtnOpen);
                if (onPopupOpen) onPopupOpen();
              }}
              className={"popup-trigger " + actionLabelClassName}
            >
              {actionLabel}
            </button>
            <div
              onClick={(event) => event.stopPropagation()}
              aria-expanded={isActionBtnOpen}
              className="absolute right-0 top-full z-10 p-2 mt-4 bg-white rounded-lg opacity-0 drop-shadow-xl transition-all translate-y-2 pointer-events-none aria-expanded:opacity-100 aria-expanded:translate-y-0 aria-expanded:pointer-events-auto"
            >
              {popup}
            </div>
          </div>
        )}
      </div>
      <div className="overflow-y-auto">
        {error ? (
          <div className="flex flex-col gap-2 justify-center p-4 w-full rounded-xl bg-brand-negative-shade text-brand-negative">
            <img className="h-8" src={Warning} alt="warning sign" />
            <p className="w-full text-left whitespace-pre-wrap">
              {typeof error === "string"
                ? error
                : error.name + "\n" + error.message + "\n" + error.stack}
            </p>
          </div>
        ) : loading ? (
          <div className="flex flex-col gap-4 justify-center items-center p-16 w-full">
            <img className="h-16 animate-spin" src={Logo} alt="Logo" />
            <p>Inhalte werden geladen...</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default Panel;
