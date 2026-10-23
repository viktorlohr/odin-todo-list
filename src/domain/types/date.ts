import type { Brand } from "./common";

export type Year = Brand<number, "Year">;
export type Month = Brand<number, "Month">;
export type Day = Brand<number, "Day">;
export interface PlainDate {
  readonly year: Year;
  readonly month: Month;
  readonly day: Day;
  readonly parse: (s: String) => PlainDate;
}

export function parse(isoString: string): PlainDate | null {
  const parseDate = // some logic
  return parsedDate;
}

// Should i use a class instead or should i remove the parse from the data? 
// In Rust, i would create an "Implementation"
