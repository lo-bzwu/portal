const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: (24 * 60 * 60 * 1000 * 365) / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000,
} as const;

const rtf = new Intl.RelativeTimeFormat("de-ch", { numeric: "auto" });

export const getRelativeTime = (d1: Date, d2 = new Date()) => {
  const elapsed = d1.getTime() - d2.getTime();

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (const unit in units)
    if (
      Math.abs(elapsed) > units[unit as keyof typeof units] ||
      unit == "second"
    )
      return rtf.format(
        Math.round(elapsed / units[unit as keyof typeof units]),
        unit as keyof typeof units
      );
};
