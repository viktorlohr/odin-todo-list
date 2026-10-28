import { Project } from "./project";
import { Todo, type TodoId } from "./todo";

export interface AppState {
  projects: Project[];
}

export const AppState = {
  initState,
  upsertProject,
  removeProject,
  upsertTodo,
  removeTodo,
};

function initState(): AppState {
  return { projects: [Project.create("default")] };
}

function upsertProject(state: AppState, updatedProject: Project): AppState {
  let updated = false;
  const updatedProjects = state.projects.map((p) => {
    if (p.projectName === updatedProject.projectName) {
      updated = true;
      return updatedProject;
    } else {
      return p;
    }
  });

  if (!updated) {
    return { ...state, projects: [...state.projects, updatedProject] };
  }

  return { ...state, projects: updatedProjects };
}

function removeProject(
  state: AppState,
  projectName: string,
  wantMerge: boolean = true,
): AppState {
  if (projectName === "default") {
    return state;
  }

  const projectToDelete = state.projects.find(
    (p) => p.projectName === projectName,
  );
  if (projectToDelete === undefined) {
    return state;
  }

  const defaultProject = state.projects.find(
    (p) => p.projectName === "default",
  );
  if (defaultProject === undefined) {
    throw new Error("Corrupted AppState; should have 'default' project.");
  }

  const otherProjects = state.projects.filter(
    (p) => !["default", projectName].includes(p.projectName),
  );

  if (wantMerge) {
    return {
      ...state,
      projects: [
        Project.merge(defaultProject, projectToDelete, "default"),
        ...otherProjects,
      ],
    };
  }

  return { ...state, projects: [defaultProject, ...otherProjects] };
}

function upsertTodo(
  state: AppState,
  projectName: string,
  todo: Todo,
): AppState {
  return _modifyProject(state, projectName, (p) => Project.upsertTodo(p, todo));
}

function removeTodo(state: AppState, projectName: string, todoId: TodoId) {
  return _modifyProject(state, projectName, (p) =>
    Project.removeTodo(p, todoId),
  );
}

function _modifyProject(
  state: AppState,
  projectName: string,
  f: (p: Project) => Project,
): AppState {
  let project = state.projects.find((p) => p.projectName === projectName);
  if (!project) {
    project = Project.create(projectName);
  }

  return upsertProject(state, f(project));
}
