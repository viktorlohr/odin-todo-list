import type { Brand } from "./common";
import { isValidIsoDate } from "./date";

export const Todo = {
  create,
};

export type TodoId = Brand<string, "DateID">;

export interface Todo {
  readonly todoId: TodoId;
  readonly title: string;
  readonly description: string;
  readonly dueDate: string;
  readonly priority: number;
}

export interface rawTodo {
  todoId: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
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

  let todoId;
  if (todo.todoId.length < 30) {
    todoId = _newTodoId();
  } else {
    todoId = todo.todoId as TodoId;
  }

  let title = todo.title;
  let description = todo.description;
  let dueDate = todo.dueDate;

  let priority = +todo.priority;
  if (priority < 0) {
    priority = 0;
  } else if (priority > 3) {
    priority = 3;
  }

  return { todoId, title, description, dueDate, priority };
}

function _newTodoId(): TodoId {
  return crypto.randomUUID() as TodoId;
}
