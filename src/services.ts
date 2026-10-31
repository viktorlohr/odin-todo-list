import { AppState } from "./domain/AppState";
import { LocalStorage as Storage } from "./storage/localStorage";
import { Todo, type rawTodo, type TodoId } from "./domain/todo";

export const Services = {
  getInMemoryState,
  upsertAndPersistTodo,
  removeTodoAndPersist,
};

let state = await Storage.loadAppState();

function getInMemoryState(): AppState {
  return state;
}

async function upsertAndPersistTodo(
  projectName: string,
  rawTodo: rawTodo,
): Promise<void> {
  let todo;
  try {
    todo = Todo.create(rawTodo);
  } catch (e) {
    throw e;
  }
  _modifyAndPersistState((s) => AppState.upsertTodo(s, projectName, todo));
}

async function removeTodoAndPersist(
  projectName: string,
  rawTodoId: string,
): Promise<void> {
  let todoId = rawTodoId as TodoId;
  _modifyAndPersistState((s) => AppState.removeTodo(s, projectName, todoId));
}

async function _modifyAndPersistState(
  f: (s: AppState) => AppState,
): Promise<void> {
  state = f(state);
  try {
    await Storage.saveAppState(state);
  } catch (e) {
    throw e;
  }
}
