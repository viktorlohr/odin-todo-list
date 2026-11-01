import type { rawTodo as RawTodo } from "../domain/todo";
import { contentEl } from "./common";
import { EventHandler } from "./EventHandler";

export function loadNewTodoFormPage(projectName: string) {
  const formEl = document.createElement("form");

  const titleEl = document.createElement("h2");
  titleEl.textContent = "Enter Todo Data";
  formEl.appendChild(titleEl);

  const titleInputEl = document.createElement("input");
  titleInputEl.id = "title";
  const titleLabelEl = document.createElement("label");
  titleLabelEl.textContent = "Title";
  titleLabelEl.htmlFor = "title";
  formEl.appendChild(titleLabelEl);
  formEl.appendChild(titleInputEl);

  const descriptionInputEl = document.createElement("input");
  descriptionInputEl.id = "description";
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
  const priorityLabelEl = document.createElement("label");
  priorityLabelEl.htmlFor = "priority";
  formEl.appendChild(priorityLabelEl);
  formEl.appendChild(priorityInputEl);

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const todo: RawTodo = {
      todoId: "",
      title: titleInputEl.value,
      description: descriptionInputEl.value,
      dueDate: "2026-11-12",
      priority: priorityInputEl.value,
    };
    EventHandler.handle({ kind: "upsertTodo", projectName, todo });
  });
  formEl.appendChild(submitBtn);

  contentEl.appendChild(formEl);
}
