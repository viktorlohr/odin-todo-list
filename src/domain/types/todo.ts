import type { TodoId } from "./iDs";
import { isValidIsoDate } from "./date";

export type Todo = { todoId: TodoId } & TodoData;

interface TodoData {
  readonly title: string;
  readonly description: string;
  readonly dueDate: string;
  readonly priority: number;
}

type Validators = {
  [K in keyof TodoData]: (value: TodoData[K]) => string | null;
};

const validators: Validators = {
  title: (v) => (v.trim() === "" ? "title must not be empty" : null),
  description: () => null,
  dueDate: (v) => (isValidIsoDate(v) ? null : "invalid date string"),
  priority: (v) =>
    Number.isInteger(v) && v >= 0 && v <= 3
      ? null
      : "priority must be an integer between 0 and 3",
};

export function createTodoData(
  title: string,
  description: string,
  dueDate: string,
  priority: number,
): TodoData {
  return {
    title,
    description,
    dueDate,
    priority,
  };
}

export function updateTodo(todo: Todo, changes: Partial<TodoData>): Todo {
  // whats the most elegant way to check which parameters are present and then do some validation checks

  return { ...todo, ...changes };
}
