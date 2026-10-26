import { Project } from "./project";

export interface AppState {
  projects: Project[];
}

export const AppState = {
  initState,
  upsertProject,
  removeProject,
};

function initState(): AppState {
  return { projects: [Project.createProject("default")] };
}
