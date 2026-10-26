import { type Storage } from "../domain/storage";
import { type AppState } from "../domain/appState";
import { readFile, writeFile } from "node:fs/promises";

const storageFile = "./projects.json";

export const jsonStorage: Storage = {
  loadAppState,
  saveAppState,
};

export async function loadAppState(): Promise<AppState> {
  try {
    const data = await readFile(storageFile, "utf8");
    return JSON.parse(data) as AppState;
  } catch (err) {
    throw new Error(`Could not load ${storageFile}`);
  }
}

async function saveAppState(state: AppState) {
  try {
    const data = JSON.stringify(state);
    await writeFile(storageFile, data);
  } catch (err) {
    throw new Error(`Could not write to ${storageFile}`);
  }
}
