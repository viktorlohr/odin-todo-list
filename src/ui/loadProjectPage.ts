import { contentEl } from "./common";
import { Project } from "../domain/project";
import { Todo } from "../domain/todo";

export function loadProjectPage(project: Project) {
  // Title
  const titleEl = document.createElement("h1");
  const projectName =
    project.projectName === "default" ? "General Tasks" : project.projectName;
  titleEl.textContent = projectName;
  contentEl.appendChild(titleEl);

  // Todos
  const todoContainerEl = document.createElement("div");
  todoContainerEl.classList.add("todo", "container");
  project.todos.forEach((todo) => {
    const todoEl = document.createElement("div");
    todoEl.classList.add("todo");

    Object.keys(todo).forEach((key) => {
      if (key !== "todoId") {
        const todoPropertyEl = document.createElement("div");
        todoPropertyEl.classList.add(key);
        todoPropertyEl.textContent = todo[key as keyof Todo] as string;
        todoEl.appendChild(todoPropertyEl);
      }
    });

    todoContainerEl.appendChild(todoEl);
  });
  contentEl.appendChild(todoContainerEl);
}
