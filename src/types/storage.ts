import { type Project } from "./project";

export interface Storage {
  loadAllProjects(): Promise<Project[]>;
  saveAllProjects(projects: Project[]): Promise<void>;
}
