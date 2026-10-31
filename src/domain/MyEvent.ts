import type { rawTodo } from "./todo";

export type MyEvent =
  | { kind: "remove"; projectName: string; todoId: string }
  | { kind: "upsert"; projectName: string; todo: rawTodo };
