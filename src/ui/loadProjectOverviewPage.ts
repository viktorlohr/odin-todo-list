import { Services } from "../services";
import { contentEl } from "./common";
import { EventHandler } from "./EventHandler";
import { loadProjectPage } from "./loadProjectPage";

export function loadProjectOverviewPage() {
  const state = Services.getInMemoryState();
  contentEl.replaceChildren();
  const projectOverviewEl = document.createElement("div");
  projectOverviewEl.style.display = "grid";
  projectOverviewEl.style.gridTemplateColumns = "1fr 1fr 1fr";
  projectOverviewEl.style.gap = "1rem";

  state.projects.forEach((p) => {
    const projectEl = document.createElement("div");
    projectEl.classList.add("project", "card");

    const titleEl = document.createElement("h2");
    titleEl.textContent = p.projectName;
    projectEl.appendChild(titleEl);
    titleEl.addEventListener("click", (e) => {
      e.preventDefault();
      loadProjectPage(p);
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "remove";
    removeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      EventHandler.handle({
        kind: "removeProject",
        projectName: p.projectName,
      });
    });

    projectOverviewEl.appendChild(projectEl);
  });

  contentEl.appendChild(projectOverviewEl);
}
