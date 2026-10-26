import { Project } from "./project";

export interface AppState {
  projects: Project[];
}

export const AppState = {
  initState,
  upsertProject,
  removeProject,
};

function initState(): AppState {
  return { projects: [Project.create("default")] };
}

function upsertProject(state: AppState, project: Project): AppState {
  let updated = false;
  const updatedProjects = state.projects.map((p) => {
    if (p.projectName === project.projectName) {
      updated = true;
      return project;
    } else {
      return p;
    }
  });

  if (!updated) {
    return { ...state, projects: [...state.projects, project] };
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
