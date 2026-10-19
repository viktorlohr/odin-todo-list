import type { Brand } from "./common";

export type Digits = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type IsoDateString =
  "${Digit}${Digit}${Digit}${Digit}-${Digit}${Digit}-${Digit}${Digit}";

export type Year = Brand<number, "Year">;
export type Month = Brand<number, "Month">;
export type Day = Brand<number, "Day">;
export interface Date {
  readonly year: Year;
  readonly month: Month;
  readonly day: Day;
}
