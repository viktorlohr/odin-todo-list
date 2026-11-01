import { Services } from "../services";
import { contentEl } from "./common";
import { EventHandler } from "./EventHandler";
import { loadNewProjectForm } from "./loadNewProjectForm";
import { loadProjectPage } from "./loadProjectPage";

export function loadProjectOverviewPage() {
  const state = Services.getInMemoryState();
  contentEl.replaceChildren();
  const projectOverviewEl = document.createElement("div");
  projectOverviewEl.style.display = "grid";
  projectOverviewEl.style.gridTemplateColumns = "1fr 1fr 1fr";
  projectOverviewEl.style.gap = "1rem";

  const projectOverviewTitleEl = document.createElement("h2");
  projectOverviewTitleEl.textContent = "My Projects";
  contentEl.appendChild(projectOverviewTitleEl);

  state.projects.forEach((p) => {
    const projectEl = document.createElement("div");
    projectEl.classList.add("project", "card");

    const titleEl = document.createElement("h2");

    titleEl.textContent =
      p.projectName === "default" ? "General Tasks" : p.projectName;
    projectEl.appendChild(titleEl);
    titleEl.addEventListener("click", (e) => {
      e.preventDefault();
      loadProjectPage(p);
    });

    if (!(p.projectName === "default")) {
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "remove";
      removeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        EventHandler.handle({
          kind: "removeProject",
          projectName: p.projectName,
        });
      });
      projectEl.appendChild(removeBtn);
    }

    projectOverviewEl.appendChild(projectEl);
  });

  contentEl.appendChild(projectOverviewEl);

  const newProjectBtn = document.createElement("button");
  newProjectBtn.classList.add("new", "project");
  newProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loadNewProjectForm();
  });
  contentEl.appendChild(newProjectBtn);
}
