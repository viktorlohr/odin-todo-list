import type { dateID } from "./iDs";
import type { PlainDate } from "./date";

export type Priority = "low" | "medium" | "high" | "utmost";

export interface TodoItem {
  readonly todoId: dateID;
  readonly title: string;
  readonly description: string;
  readonly dueDate: PlainDate;
  readonly priority: Priority;
}
