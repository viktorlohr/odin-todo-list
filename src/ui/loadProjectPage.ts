import { contentEl } from "./common";
import { Project } from "../domain/project";

export function loadProjectPage(project: Project) {
  const titleEl = document.createElement("h1");
  titleEl.textContent = project.projectName;

  contentEl.appendChild(titleEl);
}
