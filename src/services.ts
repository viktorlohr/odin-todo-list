import { AppState } from "./domain/appState";
import { jsonStorage as storage } from "./storage/jsonStorage";
import { Todo, type rawTodo } from "./domain/todo";

interface rawProject {
  title: string;
  todos: rawTodo[];
}

try {
  await storage.initStorage();
} catch (e) {
  throw new Error("Couldn't init storage");
}

let state = await storage.loadAppState();

async function loadState() {
  let state;
  try {
    state = storage.loadAppState();
  } catch (e) {
    throw e;
  }
  return state;
}

async function upsertAndSaveTodo(rawTodo: rawTodo) {
  try {
    const todo = Todo.create(rawTodo);
  } catch (e) {
    throw e;
  }


}
