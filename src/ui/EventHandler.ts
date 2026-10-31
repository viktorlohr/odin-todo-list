import type { MyEvent } from "../domain/MyEvent";
import { Services } from "../services";

export const EventHandler = {
  handle,
};

function handle(e: MyEvent) {
  switch (e.kind) {
    case "removeTodo":
      Services.removeTodoAndPersist(e.projectName, e.todoId);
      break;
    case "upsertTodo":
      Services.upsertAndPersistTodo(e.projectName, e.todo);
      break;
  }
}
