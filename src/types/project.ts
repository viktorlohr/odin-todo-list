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

export function createProject(
  projects: Project[],
  projectName: string,
): Project[] {
  if (projects.some((p) => p.projectName === projectName)) {
    throw new Error(`project ${projectName} already exists`);
  } else {
    const newProject = { projectName, todos: [] };
    const updatedProjects = [...projects, newProject];

    return updatedProjects;
  }
}
