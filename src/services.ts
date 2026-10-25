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

function getProjectNames(projects: Project[]): string[] {
  return projects.map((p) => p.projectName);
}

export function createProject(projects: Project[], projectName: string) {
  if (getProjectNames(projects).includes(projectName)) {
    throw new Error("Project already exists");
  } else {
    const newProject = { projectName, todos: [] };
    projects.push(newProject);
  }
}

export async function saveTodo(projectName: string, todo: Todo) {}
