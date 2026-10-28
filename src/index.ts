import "./styles.css";
import { Services } from "./services";

let state = await Services.loadState();
console.log(state);

// --- TEST ---
const testTodo = {
  todoId: "8cd5e818-5b1e-4d7c-b726-1b43f3f06f33",
  title: "changedTitle",
  description: "desc",
  dueDate: "2026-11-11",
  priority: "4",
};

await Services.upsertAndSaveTodo(state, "test", testTodo);

const fileData = await Services.loadState();
console.log(fileData);
console.log(state);
