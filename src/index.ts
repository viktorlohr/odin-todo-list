import "./styles.css";
import { Services } from "./services";
import { describe } from "node:test";

let state = await Services.loadState();
console.log(state);

const testTodo = {
  todoId: "",
  title: "test",
  description: "desc",
  dueDate: "2026-11-11",
  priority: "4",
};

await Services.upsertAndSaveTodo(state, "test", testTodo);

const fileData = await Services.loadState();
