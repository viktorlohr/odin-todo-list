import type { MyEvent } from "../domain/MyEvent";
import { Services } from "../services";
import { loadProjectOverviewPage } from "./loadProjectOverviewPage";
import { loadProjectPage } from "./loadProjectPage";

export const EventHandler = {
  handle,
};

function handle(e: MyEvent) {
  switch (e.kind) {
    case "removeTodo":
      Services.removeTodoAndPersist(e.projectName, e.todoId);
      _reloadProject(e.projectName);
      break;
    case "upsertTodo":
      Services.upsertAndPersistTodo(e.projectName, e.todo);
      _reloadProject(e.projectName);
      break;
  }
}

function _reloadProject(projectName: string) {
  const project = Services.getInMemoryState().projects.find(
    (p) => p.projectName === projectName,
  );
  project ? loadProjectPage(project) : loadProjectOverviewPage();
}
