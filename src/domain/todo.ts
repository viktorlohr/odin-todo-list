import type { Brand } from "./common";
import { isValidIsoDate } from "./date";

export const Todo = {
  create,
  update,
};

export type Todo = {
  readonly todoId: TodoId;
} & TodoData;

export type TodoId = Brand<string, "DateID">;

export interface TodoData {
  readonly title: string;
  readonly description: string;
  readonly dueDate: string;
  readonly priority: number;
}

function create(todoData: TodoData, todoId: TodoId = _newTodoId()): Todo {
  const errorMsgs: string[] = [];

  if (todoData.title.length < 3) {
    errorMsgs.push("title too short");
  }

  if (!isValidIsoDate(todoData.dueDate)) {
    errorMsgs.push("date must be 'YYYY-MM-DD'");
  }

  if (errorMsgs.length > 0) {
    throw new Error(errorMsgs.join(", "));
  }

  let priority = todoData.priority;
  if (priority < 0) {
    priority = 0;
  } else if (priority > 3) {
    priority = 3;
  }

  return { todoId, ...todoData, priority };
}

function update(todo: Todo, updates: Partial<TodoData>): Todo {
  const { todoId, ...oldData } = todo;
  const updatedData: TodoData = { ...oldData, ...updates };

  return create(updatedData, todoId);
}

function _newTodoId() {
  return crypto.randomUUID() as TodoId;
}
