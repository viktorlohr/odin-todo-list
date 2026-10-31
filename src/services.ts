import { AppState } from "./domain/AppState";
import { LocalStorage as Storage } from "./storage/localStorage";
import { Todo, type rawTodo, type TodoId } from "./domain/todo";

export const Services = {
  getInMemoryState,
  upsertAndPersistTodo,
  removeTodoAndPersist,
  removeAndPersistProject,
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
  todo = Todo.create(rawTodo);
  await _modifyAndPersistState((s) =>
    AppState.upsertTodo(s, projectName, todo),
  );
}

async function removeTodoAndPersist(
  projectName: string,
  rawTodoId: string,
): Promise<void> {
  let todoId = rawTodoId as TodoId;
  _modifyAndPersistState((s) => AppState.removeTodo(s, projectName, todoId));
}

async function removeAndPersistProject(projectName: string) {
  _modifyAndPersistState((s) => AppState.removeProject(s, projectName, true));
}

async function _modifyAndPersistState(
  f: (s: AppState) => AppState,
): Promise<void> {
  const nextState = f(state);
  await Storage.saveAppState(state);
  state = nextState;
}
