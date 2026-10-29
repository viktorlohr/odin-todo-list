import "./styles.css";
import { Services } from "./services";
import { loadProjectPage } from "./ui/loadProjectPage";

let state = await Services.loadState();
console.log("initial state: ");
console.log(state);

const defaultProject = state.projects.find((p) => p.projectName === "default");
if (!defaultProject) {
  throw new Error("no default project; state probably corrupted");
}
// --- TEST ----
const testTodo = {
  todoId: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  title: "getting foo and bar",
  description:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
  dueDate: "2026-12-11",
  priority: "0",
};

state = await Services.upsertAndSaveTodo(state, "default", testTodo);
// --- TEST ----

loadProjectPage(defaultProject);

document.addEventListener("todo-delete", async (e) => {
  const deleteEvent = e as CustomEvent<{ projectName: string; todoId: string }>;
  const { projectName, todoId } = deleteEvent.detail;

  state = await Services.removeTodo(state, projectName, todoId);
  loadProjectPage(state.projects.find((p) => p.projectName === projectName)!);
});
