import { AppState } from "./domain/appState";
import { jsonStorage as storage } from "./storage/jsonStorage";

const STATE = await loadState();

async function loadState() {
  let state;
  try {
    state = storage.loadAppState();
  } catch {
    state = AppState.initState();
  }
  return state;
}
