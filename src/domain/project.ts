import type { Todo } from "./todo";

export interface Project {
  projectName: string;
  todos: Todo[];
}

export function modifyProjectTodos(
  project: Project,
  f: (todos: Todo[]) => Todo[],
): Project {
  return { ...project, todos: f(project.todos) };
}


