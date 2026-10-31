import { type AppState } from "../domain/AppState";

export interface Storage {
  loadAppState(): Promise<AppState>;
  saveAppState(state: AppState): Promise<void>;
}
