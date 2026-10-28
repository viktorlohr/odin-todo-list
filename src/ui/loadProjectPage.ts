import { contentEl } from "./common";
import { Project } from "../domain/project";
import { Todo } from "../domain/todo";

export function loadProjectPage(project: Project) {
  // Title
  const titleEl = document.createElement("h2");
  const projectName =
    project.projectName === "default" ? "General Tasks" : project.projectName;
  titleEl.textContent = projectName;
  contentEl.appendChild(titleEl);

  // Todos
  const todoContainerEl = document.createElement("div");
  todoContainerEl.classList.add("todo", "container");
  project.todos
    .sort((a, b) => b.priority - a.priority)
    .forEach((todo) => {
      const todoEl = document.createElement("div");
      todoEl.classList.add("todo", "card");

      Object.keys(todo).forEach((keyStr) => {
        const key = keyStr as keyof Todo;
        if (key !== "todoId") {
          const todoPropertyEl = document.createElement("div");
          todoPropertyEl.classList.add(keyStr);

          let textContent;
          switch (key) {
            case "dueDate":
              const dateArray = todo[key].split("-").map((x) => x as string);
              textContent =
                "Due " + dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];
              break;
            case "priority":
              let priority;
              switch (todo[key]) {
                case 0:
                  priority = "Low";
                  todoEl.classList.add("low-priority");
                  break;
                case 1:
                  priority = "Medium";
                  todoEl.classList.add("medium-priority");
                  break;
                case 2:
                  priority = "High";
                  todoEl.classList.add("high-priority");
                  break;
                case 3:
                  priority = "Very high";
                  todoEl.classList.add("very-high-priority");
                  break;
              }
              textContent = "Priority: " + priority;
              break;
            default:
              textContent = todo[key] as string;
          }

          todoPropertyEl.textContent = textContent;
          todoEl.appendChild(todoPropertyEl);
        }
      });

      todoContainerEl.appendChild(todoEl);
    });
  contentEl.appendChild(todoContainerEl);
}
