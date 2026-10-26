import { type AppState } from "./appState";

export interface Storage {
  loadAppState(): Promise<AppState>;
  saveAppState(state: AppState): Promise<void>;
}
