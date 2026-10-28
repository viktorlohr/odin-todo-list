import { AppState } from "./domain/appState";
import { LocalStorage as Storage } from "./storage/localStorage";
import { Todo, type rawTodo, type TodoId } from "./domain/todo";

export const Services = {
  loadState,
  upsertAndSaveTodo,
  removeTodo,
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

async function removeTodo(
  state: AppState,
  projectName: string,
  rawTodoId: string,
) {
  let todoId = rawTodoId as TodoId;
  return _modifyAndSaveState(state, (s) =>
    AppState.removeTodo(s, projectName, todoId),
  );
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
