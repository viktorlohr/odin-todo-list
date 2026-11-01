import { contentEl } from "./common";
import { Project } from "../domain/project";
import { Todo } from "../domain/todo";
import { EventHandler } from "./EventHandler";
import { loadProjectOverviewPage } from "./loadProjectOverviewPage";
import { loadNewTodoFormPage } from "./loadNewTodoFormPage";

export function loadProjectPage(project: Project) {
  contentEl.replaceChildren();
  // Project Overview
  const projectOverviewBtn = document.createElement("button");
  projectOverviewBtn.textContent = " <- Project Overview";
  projectOverviewBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loadProjectOverviewPage();
  });
  contentEl.appendChild(projectOverviewBtn);

  // Title
  const titleEl = document.createElement("h2");
  titleEl.textContent =
    project.projectName === "default" ? "General Tasks" : project.projectName;
  contentEl.appendChild(titleEl);

  // New Todo Button
  const newTodoBtn = document.createElement("button");
  newTodoBtn.classList.add("new");
  newTodoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loadNewTodoFormPage(project.projectName);
  });
  contentEl.appendChild(newTodoBtn);

  // Todos
  const todoContainerEl = document.createElement("div");
  todoContainerEl.classList.add("todo", "container");
  project.todos
    .sort((a, b) => b.priority - a.priority)
    .forEach((todo) => {
      const todoEl = document.createElement("div");
      todoEl.classList.add("todo", "card");

      addTextContentAndPriorityClasses(todo, todoEl);
      addBtns(todo, todoEl);

      todoContainerEl.appendChild(todoEl);
    });
  contentEl.appendChild(todoContainerEl);

  function addTextContentAndPriorityClasses(todo: Todo, todoEl: HTMLElement) {
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
  }

  function addBtns(todo: Todo, todoEl: HTMLElement) {
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove");
    removeButton.textContent = "remove";
    removeButton.addEventListener("click", (e) => {
      e.preventDefault();
      EventHandler.handle({
        kind: "removeTodo",
        projectName: project.projectName,
        todoId: todo.todoId,
      });
    });

    const editButton = document.createElement("div");
    editButton.textContent = "edit";
    editButton.classList.add("edit");
    editButton.addEventListener("click", (e) => {
      e.preventDefault();
      loadNewTodoFormPage(project.projectName, todo);
    });

    todoEl.appendChild(editButton);
    todoEl.appendChild(removeButton);
  }
}
