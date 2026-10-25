import { type Storage } from "../types/storage";
import { type Project } from "../types/project";
import { readFile, writeFile } from "node:fs/promises";

const storageFile = "./projects.json";

export const jsonStorage: Storage = {
  loadAllProjects,
  saveAllProjects,
};

export async function loadAllProjects(): Promise<Project[]> {
  try {
    const data = await readFile(storageFile, "utf8");
    return JSON.parse(data) as Project[];
  } catch (err) {
    throw new Error(`Could not load ${storageFile}`);
  }
}

async function saveAllProjects(projects: Project[]) {
  try {
    const data = JSON.stringify(projects);
    await writeFile(storageFile, data);
  } catch (err) {
    throw new Error(`Could not write to ${storageFile}`);
  }
}

