import type { dateID } from "./iDs";
import { parseIsoDate, type IsoDate } from "./date";

export interface ToDo {
  readonly todoId: dateID;
  title: string;
  description: string;
  dueDate: IsoDate;
  priority: number;
}

export function setPriority(todo: ToDo, priority: number) {
  if (0 <= priority && priority < 4) {
    todo.priority = priority;
  } else throw new Error("Priority must be between 0 and 3");
}

export function setTitle(todo: ToDo, title: string) {
  if (title.length <= 1) {
    throw new Error("title is too short");
  }
}

export function setDescription(todo: ToDo, desc: string) {
  todo.description = desc;
}

export function setDate(todo: ToDo, dateString: string) {
  isoDate = parseIsoDate(dateString);
  
}
