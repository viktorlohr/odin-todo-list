import { type Project } from "./project";
import { type Todo } from "./todo";

export interface Storage {
  loadAllProjects(): Promise<Project[]>;
  saveAllProjects(projects: Project[]): Promise<void>;
  saveTodo(todo: Todo): Promise<void>;
}
