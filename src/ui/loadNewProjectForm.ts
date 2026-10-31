import { contentEl } from "./common";
import { EventHandler } from "./EventHandler";

export function loadNewProjectForm() {
  const formContainer = document.createElement("form");
  formContainer.classList.add("new-project");
  const title = document.createElement("h2");
  title.textContent = "Enter new project name";
  formContainer.appendChild(title);

  const inputEl = document.createElement("input");
  formContainer.appendChild(inputEl);

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Create Project";
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    EventHandler.handle({ kind: "upsertProject", projectName: inputEl.value });
  });
  formContainer.appendChild(submitBtn);

  contentEl.appendChild(formContainer);
}
