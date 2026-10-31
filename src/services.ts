import { AppState } from "./domain/AppState";
import { LocalStorage as Storage } from "./storage/localStorage";
import { Todo, type rawTodo, type TodoId } from "./domain/todo";

export const Services = {
  getInMemoryState,
  upsertAndSaveTodo,
  removeTodoAndSave,
};

let state = await _loadState();

function getInMemoryState(): AppState {
  return state;
}

async function upsertAndSaveTodo(projectName: string, rawTodo: rawTodo) {
  let todo;
  try {
    todo = Todo.create(rawTodo);
  } catch (e) {
    throw e;
  }
  _modifyAndSaveState((s) => AppState.upsertTodo(s, projectName, todo));
}

async function removeTodoAndSave(projectName: string, rawTodoId: string) {
  let todoId = rawTodoId as TodoId;
  _modifyAndSaveState((s) => AppState.removeTodo(s, projectName, todoId));
}

async function _modifyAndSaveState(f: (s: AppState) => AppState) {
  state = f(state);
  try {
    await Storage.saveAppState(state);
  } catch (e) {
    throw e;
  }
}

async function _loadState(): Promise<AppState> {
  try {
    await Storage.initStorage();
  } catch (e) {
    throw new Error("Couldn't init storage");
  }

  let s;
  try {
    s = Storage.loadAppState();
  } catch (e) {
    throw e;
  }
  return state;
}
