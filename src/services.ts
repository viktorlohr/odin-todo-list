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

export function createProject(projects: Project[], newProject: Project) {
  if (getProjectNames(projects).includes(newProject.projectName)) {
    throw new Error("Project already exists");
  } else {
    return projects.push(newProject);
  }
}

export async function saveTodo(projectName: string, todo: Todo) {}
