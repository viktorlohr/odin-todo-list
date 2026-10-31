import type { MyEvent } from "../domain/MyEvent";
import { Services } from "../services";
import { loadProjectOverviewPage } from "./loadProjectOverviewPage";
import { loadProjectPage } from "./loadProjectPage";

export const EventHandler = {
  handle,
};

async function handle(e: MyEvent) {
  switch (e.kind) {
    case "removeTodo":
      await Services.removeTodoAndPersist(e.projectName, e.todoId);
      _reloadProject(e.projectName);
      break;
    case "upsertTodo":
      await Services.upsertAndPersistTodo(e.projectName, e.todo);
      _reloadProject(e.projectName);
      break;
    case "upsertProject":
      await Services.upsertAndPersistProject(e.projectName);
      loadProjectOverviewPage();
      break;
    case "removeProject":
      await Services.removeAndPersistProject(e.projectName);
      loadProjectOverviewPage();
      break;
    default:
      console.log(e + " not implemented yet...");
  }
}

async function _reloadProject(projectName: string) {
  const project = await Services.getInMemoryState().projects.find(
    (p) => p.projectName === projectName,
  );
  project ? loadProjectPage(project) : loadProjectOverviewPage();
}
