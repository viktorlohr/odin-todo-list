import type { Project } from "./domain/project";
import { type Todo } from "./domain/todo";
import { jsonStorage as storage } from "./storage/jsonStorage";

export async function loadProjects() {
  try {
    return storage.loadAllProjects();
  } catch (err) {
    throw err;
  }
}
