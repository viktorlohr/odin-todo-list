import { AppState } from "./domain/appState";
import { jsonStorage as Storage } from "./storage/jsonStorage";
import { Todo, type rawTodo } from "./domain/todo";

export const Services = {
  loadState,
  upsertAndSaveTodo,
};

async function loadState(): Promise<AppState> {
  try {
    await Storage.initStorage();
  } catch (e) {
    throw new Error("Couldn't init storage");
  }

  let state;
  try {
    state = Storage.loadAppState();
  } catch (e) {
    throw e;
  }
  return state;
}

async function upsertAndSaveTodo(
  state: AppState,
  projectName: string,
  rawTodo: rawTodo,
) {
  let todo;
  try {
    todo = Todo.create(rawTodo);
  } catch (e) {
    throw e;
  }

  _modifyAndSaveState(state, (s) => AppState.upsertTodo(s, projectName, todo));
}

async function _modifyAndSaveState(
  state: AppState,
  f: (s: AppState) => AppState,
) {
  state = f(state);
  try {
    await Storage.saveAppState(state);
  } catch (e) {
    throw e;
  }
}
