import type { ReactNode } from "react";

import { CARD_DATE_TEXT_CLASS, CARD_LOCATION_TEXT_CLASS } from "./cardSemantics";

type CardHeaderProps = {
  primary: ReactNode;
  secondary: ReactNode;
  date: ReactNode;
  location?: ReactNode;
  dateClassName?: string;
  locationClassName?: string;
};

export const CardHeader = ({
  primary,
  secondary,
  date,
  location,
  dateClassName = CARD_DATE_TEXT_CLASS,
  locationClassName = CARD_LOCATION_TEXT_CLASS,
}: CardHeaderProps) => {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="min-w-0">{primary}</div>
        <div className="min-w-0">{secondary}</div>
      </div>

      <div className="shrink-0 space-y-1 text-left leading-tight sm:text-right">
        <p className={dateClassName}>{date}</p>
        {location ? <p className={locationClassName}>{location}</p> : null}
      </div>
    </div>
  );
};
