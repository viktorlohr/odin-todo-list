import "./styles.css";
import { Services } from "./services";

let state = await Services.loadState();
console.log("initial state: " + state);

// --- TEST ---
async function test() {
  const testProjectName = "testtestProject";
  const testTodoId = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
  const testTodo = {
    todoId: testTodoId,
    title: "huhu",
    description: "desc",
    dueDate: "2026-11-11",
    priority: "4",
  };

  state = await Services.upsertAndSaveTodo(state, testProjectName, testTodo);
  console.log("in memory state after insertion: ");
  console.log(state);
  console.log("state of local storage: ");
  console.log(await Services.loadState());

  state = await Services.removeTodo(state, testProjectName, testTodoId);
  console.log("state after removal: ");
  console.log(state);
  console.log("state of local storage: ");
  console.log(await Services.loadState());

  state = await Services.upsertAndSaveTodo(state, testProjectName, testTodo);
  console.log("in memory state after second insertion: ");
  console.log(state);
  console.log("state of local storage: ");
  console.log(await Services.loadState());
}

test();
