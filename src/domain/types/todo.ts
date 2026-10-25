import type { TodoId } from "./iDs";
import { isValidIsoDate } from "./date";

export type Todo = { todoId: TodoId } & TodoData;

interface TodoData {
  readonly title: string;
  readonly description: string;
  readonly dueDate: string;
  readonly priority: number;
}

export function createTodoData(
  title: string,
  description: string,
  dueDate: string,
  priority: number,
): TodoData {
  const errorMsgs: string[] = [];

  if (title.length < 3) {
    errorMsgs.push("title too short");
  }

  if (!isValidIsoDate(dueDate)) {
    errorMsgs.push("date must be 'YYYY-MM-DD'");
  }

  if (priority < 0 || 3 < priority) {
    errorMsgs.push("priority must be between 0 and 3");
  }

  if (errorMsgs.length > 0) {
    throw new Error(errorMsgs.join(", "));
  }

  return {
    title,
    description,
    dueDate,
    priority,
  };
}

export function createTodoFromData(todoData: TodoData): Todo {
  return { todoId: crypto.randomUUID() as TodoId, ...todoData };
}

export function updateTodo(todo: Todo, changes: Partial<TodoData>): Todo {
  // whats the most elegant way to check which parameters are present and then do some validation checks

  return { ...todo, ...changes };
}
