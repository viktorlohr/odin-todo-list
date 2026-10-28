import { contentEl } from "./common";
import { Project } from "../domain/project";

export function loadProjectPage(project: Project) {
  const titleEl = document.createElement("h1");
  const projectName =
    project.projectName === "default" ? "General Tasks" : project.projectName;

  titleEl.textContent = projectName;

  contentEl.appendChild(titleEl);
}
