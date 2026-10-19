import type { Brand } from "./common";
import type { Date } from "./date";

export type Priority = "low" | "medium" | "high" | "utmost";

export interface TodoItem {
  readonly todoId: Brand<string, "TodoID">;
  readonly title: string;
  readonly description: string;
  readonly dueDate: Date;
  readonly priority: Priority;
}
