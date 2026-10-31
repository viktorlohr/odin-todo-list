import type { MyEvent } from "../domain/MyEvent";
import { Services } from "../services";

export const EventHandler = {
  handle,
};

function handle(e: MyEvent) {
  switch (e.kind) {
    case "remove":
      Services.removeTodoAndPersist(e.projectName, e.todoId);
      break;
    case "upsert":
      Services.upsertAndPersistTodo(e.projectName, e.todo);
      break;
  }
}
