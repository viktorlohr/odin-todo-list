import "./styles.css";
import { Services } from "./services";
import { loadProjectPage } from "./ui/loadProjectPage";

let state = await Services.loadState();
console.log("initial state: " + state);

const defaultProject = state.projects.find((p) => p.projectName === "default");
if (!defaultProject) {
  throw new Error("no default project; state probably corrupted");
}

loadProjectPage(defaultProject);
