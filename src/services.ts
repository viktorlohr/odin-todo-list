import { AppState } from "./domain/appState";
import { jsonStorage as storage } from "./storage/jsonStorage";
import { Todo, type rawTodo } from "./domain/todo";

export const Services = {
  loadState,
  upsertAndSaveTodo,
};

async function loadState(): Promise<AppState> {
  try {
    await storage.initStorage();
  } catch (e) {
    throw new Error("Couldn't init storage");
  }

  let state;
  try {
    state = storage.loadAppState();
  } catch (e) {
    throw e;
  }
  return state;
}

async function upsertAndSaveTodo(rawTodo: rawTodo, projectName: string) {
  try {
    const todo = Todo.create(rawTodo);
  } catch (e) {
    throw e;
  }
}
