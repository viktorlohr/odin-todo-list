import { type Storage } from "./storageInterface";
import { AppState } from "../domain/appState";
import { readFile, writeFile } from "node:fs/promises";

const storageFilePath = "./projects.json";

export const jsonStorage: Storage = {
  initStorage,
  loadAppState,
  saveAppState,
};

async function initStorage() {
  const doesExist = _checkFileExists();
  if (!doesExist) {
    saveAppState(AppState.initState());
  }
}

async function loadAppState(): Promise<AppState> {
  try {
    const data = await readFile(storageFilePath, "utf8");
    return JSON.parse(data) as AppState;
  } catch (err) {
    throw new Error(`Could not load ${storageFilePath}`);
  }
}

async function saveAppState(state: AppState) {
  try {
    const data = JSON.stringify(state);
    await writeFile(storageFilePath, data);
  } catch (err) {
    throw new Error(`Could not write to ${storageFilePath}`);
  }
}

function _checkFileExists() {
  try {
    await access(storageFilePath);
    return true;
  } catch {
    return false;
  }
}
