export type Brand<K, T> = K & { readonly __brand: T };

export type Priority = "low" | "medium" | "high" | "utmost";

export type Digits = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type IsoDateString =
  "${Digit}${Digit}${Digit}${Digit}-${Digit}${Digit}-${Digit}${Digit}";

export type Year = Brand<number, "Year">;
export type Month = Brand<number, "Month">;
export type Day = Brand<number, "Day">;
export interface Date {
  year: Year;
  month: Month;
  day: Day;
}

export interface TodoItem {
  readonly todoId: Brand<string, "TodoID">;
  readonly title: string;
  readonly description: string;
  readonly dueDate: IsoDateString;
  readonly priority: Priority;
}
