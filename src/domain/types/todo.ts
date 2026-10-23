import type { todoId as todoId } from "./iDs";
import { isValidIsoDate } from "./date";

export interface ToDo {
  readonly todoId: todoId;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
}

export function setTitle(todo: ToDo, title: string) {
  if (title.length <= 1) {
    throw new Error("title is too short");
  }

  todo.title = title;
}

export function setDescription(todo: ToDo, desc: string) {
  todo.description = desc;
}

export function setDate(todo: ToDo, date: string) {
  if (!isValidIsoDate(date)) {
    throw new Error("Invalid date");
  }

  todo.dueDate = date;
}

export function setPriority(todo: ToDo, priority: number) {
  if (0 <= priority && priority < 4) {
    todo.priority = priority;
  } else throw new Error("Priority must be between 0 and 3");
}
