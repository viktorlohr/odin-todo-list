import type { dateID } from "./iDs";
import type { Date } from "./date";

export type Priority = "low" | "medium" | "high" | "utmost";

export interface TodoItem {
  readonly todoId: dateID;
  readonly title: string;
  readonly description: string;
  readonly dueDate: Date;
  readonly priority: Priority;
}
