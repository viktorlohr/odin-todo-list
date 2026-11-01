import { AppState } from "./domain/AppState";
import { LocalStorage as Storage } from "./storage/localStorage";
import { Todo, type rawTodo, type TodoId } from "./domain/todo";
import { Project } from "./domain/project";

export const Services = {
  getInMemoryState,
  upsertAndPersistTodo,
  removeTodoAndPersist,
  upsertAndPersistProject,
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
  await _modifyAndPersistState((s) =>
    AppState.removeTodo(s, projectName, todoId),
  );
}

async function upsertAndPersistProject(projectName: string) {
  await _modifyAndPersistState((s) =>
    AppState.upsertProject(s, Project.create(projectName)),
  );
}

async function removeAndPersistProject(projectName: string) {
  await _modifyAndPersistState((s) =>
    AppState.removeProject(s, projectName, true),
  );
}

async function _modifyAndPersistState(
  f: (s: AppState) => AppState,
): Promise<void> {
  const nextState = f(state);
  await Storage.saveAppState(nextState);
  state = nextState;
}
