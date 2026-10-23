import type { ToDo } from "./todo";

export interface Project {
  projectName: string;
  todos: ToDo[];
}

export function addTodo(project: Project, todo: ToDo) {
  project.todos.push(todo);
}
