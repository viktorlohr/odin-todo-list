import type { rawTodo } from "./todo";

export type MyEvent =
  | { kind: "openProject"; projectName: string }
  | { kind: "removeTodo"; projectName: string; todoId: string }
  | { kind: "upsertTodo"; projectName: string; todo: rawTodo };
