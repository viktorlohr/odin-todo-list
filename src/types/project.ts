import type { Todo } from "./todo";

export interface Project {
  projectName: string;
  todos: Todo[];
}

export function addTodo(project: Project, todo: Todo) {
  project.todos.push(todo);
}
