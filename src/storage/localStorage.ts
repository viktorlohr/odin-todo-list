import { type Storage } from "./storageInterface";
import { AppState } from "../domain/AppState";

const STORAGE_KEY = "odin_todo_list_state";

export const LocalStorage: Storage = {
  loadAppState,
  saveAppState,
};

async function _initStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    saveAppState(AppState.initState());
  }
}

async function loadAppState(): Promise<AppState> {
  try {
    let data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const initState = AppState.initState();
      try {
        saveAppState(initState);
      } catch (e) {
        throw e;
      }
      data = JSON.stringify(initState);
    }
    return JSON.parse(data) as AppState;
  } catch (err) {
    throw new Error(`Could not load state from localStorage`);
  }
}

async function saveAppState(state: AppState) {
  try {
    const data = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    throw new Error(`Could not save state to localStorage`);
  }
}
