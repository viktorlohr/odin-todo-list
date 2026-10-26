import type { Todo, TodoId } from "./todo";

export interface Project {
  readonly projectName: string;
  readonly todos: Todo[];
}

export const Project = {
  create,
  upsertTodo,
  removeTodo,
  merge,
};

function create(projectName: string, todos: Todo[] = []): Project {
  return { projectName, todos };
}

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

function removeTodo(project: Project, idToRemove: TodoId): Project {
  return {
    ...project,
    todos: project.todos.filter((todo) => todo.todoId !== idToRemove),
  };
}

function merge(
  project1: Project,
  project2: Project,
  newProjectName: string,
): Project {
  return create(newProjectName, [...project1.todos, ...project2.todos]);
}

