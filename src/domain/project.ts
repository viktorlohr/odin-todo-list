import type { Todo } from "./todo";
import type { TodoId } from "./iDs";

export interface Project {
  projectName: string;
  todos: Todo[];
}

export const Project = {
  upsertTodo,
};

function upsertTodo(project: Project, newTodo: Todo): Project {
  let hasUpdated = false;
  const updatedTodos = project.todos.map((todo) => {
    if (todo.todoId === newTodo.todoId) {
      hasUpdated = true;
      return newTodo;
    } else {
      return todo;
    }
  });

  if (hasUpdated) return { ...project, todos: updatedTodos };

  return { ...project, todos: [...project.todos, newTodo] };
}

function removeTodo(project: Project, idToRemove: TodoId) {}
