import { contentEl } from "./common";

export function loadNewProjectForm() {
  const formContainer = document.createElement("div");
  formContainer.classList.add("new-project", "form-container");
  const title = document.createElement("h2");
  title.textContent = "Enter new project name";
  formContainer.appendChild(title);

  contentEl.appendChild(formContainer);
}
