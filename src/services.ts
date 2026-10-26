import type { Project } from "./types/project";
import { type Todo } from "./types/todo";
import { jsonStorage as storage } from "./storage/jsonStorage";

export async function loadProjects() {
  try {
    return storage.loadAllProjects();
  } catch (err) {
    throw err;
  }
}

