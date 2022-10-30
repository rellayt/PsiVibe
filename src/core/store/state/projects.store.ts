import { EntityStore, QueryEntity, StoreConfig } from '@datorama/akita';
import { ProjectVisibilityFilter, ProjectsEntityState, ProjectsState } from '../models/Projects.model';
import { combineLatest, map, of, switchMap } from 'rxjs';
import { Project, ProjectStatus } from '../../../models/Project.model';
import { switchCase } from '@mindspace-io/react';

export const PROJECTS_INITIAL_STATE: ProjectsState = {
	projects: [],
	detailedProject: null,
	detailedProjectMessages: [],
	personalProjects: [],
	filter: ProjectVisibilityFilter.SHOW_ACTIVE,
	currentPage: 1,
};

type ProjectsWithFilter = [filter: ProjectVisibilityFilter.SHOW_ACTIVE | ProjectVisibilityFilter.SHOW_INACTIVE, projects: Project[]];

type ProjectsWitCurrentPage = [currentPage: number, projects: Project[]];

const projectsPerPage = 3;

@StoreConfig({ name: 'Projects' })
export class ProjectsStore extends EntityStore<ProjectsEntityState, ProjectsState> {
	constructor() {
		super(PROJECTS_INITIAL_STATE);
	}
}

export class ProjectsQuery extends QueryEntity<ProjectsEntityState, ProjectsState> {
	filter$ = this.select(({ filter }) => filter);

	projects$ = this.select(({ projects }) => projects);

	personalProjects$ = this.select(({ personalProjects }) => personalProjects);

	currentPage$ = this.select(({ currentPage }) => currentPage);

	filteredProjects$ = combineLatest([this.filter$, this.projects$]).pipe(
		map(this.gatherProjectsByFilter),
		switchMap((projects: Project[]) => combineLatest([this.currentPage$, of(projects)])),
		map(ProjectsQuery.gatherProjectsByCurrentPage)
	);

	totalPages$ = combineLatest([this.filter$, this.projects$])
		.pipe(map(this.gatherProjectsByFilter))
		.pipe(map((projects) => Math.ceil(projects.length / projectsPerPage) || 1));

	detailedProject$ = this.select(({ detailedProject }) => detailedProject);

	detailedProjectMessages$ = this.select(({ detailedProjectMessages }) => detailedProjectMessages);

	isProcessing$ = this.selectLoading();

	constructor(protected store: ProjectsStore) {
		super(store);
		store.setLoading(false);
	}

	private gatherProjectsByFilter([filter, projects]: ProjectsWithFilter): Project[] {
		const filteredProjects = switchCase(
			{
				[ProjectVisibilityFilter.SHOW_ACTIVE]: () => projects.filter(({ projectStatus }) => projectStatus === ProjectStatus.NEW),
				[ProjectVisibilityFilter.SHOW_INACTIVE]: () => projects.filter(({ projectStatus }) => projectStatus !== ProjectStatus.NEW),
			},
			projects || []
		);
		return filteredProjects(filter);
	}

	private static gatherProjectsByCurrentPage([currentPage, projects]: ProjectsWitCurrentPage): Project[] {
		const indexOfLastProject = currentPage * projectsPerPage;
		const indexOfFirstProject = indexOfLastProject - projectsPerPage;
		return projects.slice(indexOfFirstProject, indexOfLastProject);
	}
}

export const projectsStore = new ProjectsStore();

export const projectsQuery = new ProjectsQuery(projectsStore);
