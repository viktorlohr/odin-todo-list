import type { Brand } from "./common";
import { isValidIsoDate } from "./date";

export const Todo = {
  create,
  update,
};

interface rawTodo {
  todoId: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
}

export type TodoId = Brand<string, "DateID">;

export interface Todo {
  readonly todoId: TodoId;
  readonly title: string;
  readonly description: string;
  readonly dueDate: string;
  readonly priority: number;
}

function create(todo: rawTodo): Todo {
  const errorMsgs: string[] = [];

  if (todo.title.length < 3) {
    errorMsgs.push("title too short");
  }

  if (!isValidIsoDate(todo.dueDate)) {
    errorMsgs.push("date must be 'YYYY-MM-DD'");
  }

  if (errorMsgs.length > 0) {
    throw new Error(errorMsgs.join(", "));
  }

  let priority = todo.priority;
  if (priority < 0) {
    priority = 0;
  } else if (priority > 3) {
    priority = 3;
  }

  return { ...todo, priority };
}

function update(todo: Todo, updates: Partial<Todo>): Todo {
  const { todoId, ...oldData } = todo;
  const updatedData: Todo = { ...oldData, ...updates };

  return create(updatedData, todoId);
}

function _newTodoId() {
  return crypto.randomUUID() as TodoId;
}
