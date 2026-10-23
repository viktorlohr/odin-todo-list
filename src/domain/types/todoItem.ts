import type { dateID } from "./iDs";
import type { IsoDate } from "./date";

export type Priority = "low" | "medium" | "high" | "utmost";

export interface TodoItem {
  readonly todoId: dateID;
  readonly title: string;
  readonly description: string;
  readonly dueDate: IsoDate;
  readonly priority: Priority;
}
