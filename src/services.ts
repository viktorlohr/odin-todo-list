import type { Project } from "./types/project";
import type { Todo } from "./types/todo";
import { jsonStorage } from "./storage/jsonStorage";

export async function loadProjects() {
  try {
    return jsonStorage.loadAllProjects();
  } catch (err) {
    throw err;
  }
}

export function createProject(
  projects: Project[],
  projectName: string,
): Project[] {
  if (projects.some((p) => p.projectName === projectName)) {
    throw new Error(`project ${projectName} already exists`);
  } else {
    const newProject = { projectName, todos: [] };
    projects.push(newProject);
    return projects;
  }
}

export function saveTodo(
  projects: Project[],
  todo: Todo,
  projectName: string,
): Project[] {
  return projects.map((project) =>
    project.projectName === projectName
      ? { ...project, todos: [...project.todos, todo] }
      : project,
  );
}
