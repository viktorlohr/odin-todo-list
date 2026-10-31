import { Services } from "../services";
import { contentEl } from "./common";
import { loadProjectPage } from "./loadProjectPage";

export function loadProjectOverviewPage() {
  const state = Services.getInMemoryState();
  contentEl.replaceChildren();
  contentEl.style.display = "flex";

  state.projects.forEach((p) => {
    const projectEl = document.createElement("div");
    projectEl.classList.add("project", "card");
    projectEl.textContent = p.projectName;
    projectEl.addEventListener("click", (e) => {
      e.preventDefault();
      loadProjectPage(p);
    });

    contentEl.appendChild(projectEl);
  });
}
