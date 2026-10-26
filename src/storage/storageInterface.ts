import { type AppState } from "../domain/appState";

export interface Storage {
  initStorage(): Promise<void>;
  loadAppState(): Promise<AppState>;
  saveAppState(state: AppState): Promise<void>;
}
