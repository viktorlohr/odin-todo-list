import { isValidIsoDate } from "../domain/date";
import type { rawTodo as RawTodo, Todo } from "../domain/todo";
import { contentEl } from "./common";
import { EventHandler } from "./EventHandler";

export function loadNewTodoFormPage(projectName: string, todo?: Todo) {
  const formEl = document.createElement("form");

  const titleEl = document.createElement("h2");
  titleEl.textContent = "Enter Todo Data";
  formEl.appendChild(titleEl);

  const titleInputEl = document.createElement("input");
  titleInputEl.id = "title";
  titleInputEl.value = todo ? todo.title : "";
  const titleLabelEl = document.createElement("label");
  titleLabelEl.textContent = "Title";
  titleLabelEl.htmlFor = "title";
  formEl.appendChild(titleLabelEl);
  formEl.appendChild(titleInputEl);

  const descriptionInputEl = document.createElement("input");
  descriptionInputEl.id = "description";
  descriptionInputEl.value = todo ? todo.description : "";
  const descriptionLabelEl = document.createElement("label");
  descriptionLabelEl.textContent = "Description";
  descriptionLabelEl.htmlFor = "description";
  formEl.appendChild(descriptionLabelEl);
  formEl.appendChild(descriptionInputEl);

  const priorityInputEl = document.createElement("input");
  priorityInputEl.id = "priority";
  priorityInputEl.type = "range";
  priorityInputEl.min = "0";
  priorityInputEl.max = "3";
  priorityInputEl.value = todo ? String(todo.priority) : "0";
  const priorityLabelEl = document.createElement("label");
  priorityLabelEl.htmlFor = "priority";
  priorityLabelEl.textContent = "Priority";
  formEl.appendChild(priorityLabelEl);
  formEl.appendChild(priorityInputEl);

  const dueDateInputEl = document.createElement("input");
  dueDateInputEl.id = "date";
  dueDateInputEl.value = todo ? todo.dueDate : "";
  const dueDateLabelEl = document.createElement("label");
  dueDateLabelEl.htmlFor = "date";
  dueDateLabelEl.textContent = "Due (YYYY-MM-DD)";
  formEl.appendChild(dueDateLabelEl);
  formEl.appendChild(dueDateInputEl);

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const rawTodo: RawTodo = {
      todoId: todo ? todo.todoId : "",
      title: titleInputEl.value,
      description: descriptionInputEl.value,
      dueDate: isValidIsoDate(dueDateInputEl.value.trim())
        ? dueDateInputEl.value.trim()
        : "2000-01-01",
      priority: priorityInputEl.value,
    };
    EventHandler.handle({ kind: "upsertTodo", projectName, todo: rawTodo });
  });
  formEl.appendChild(submitBtn);

  contentEl.appendChild(formEl);
}
