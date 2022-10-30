import { StoreManagement } from './store-management.abstract';
import { projectsQuery, ProjectsQuery, projectsStore, ProjectsStore } from '../state/projects.store';
import { projectsService, ProjectsService } from '../services/projects.service';
import { ProjectsEntityState, ProjectsState, ProjectVisibilityFilter } from '../models/Projects.model';
import { Project } from '../../../models/Project.model';
import { first } from 'rxjs';
import { RunnableFunction } from '../../base/types/runnable-function';
import { User } from '../../../models/User.model';
import { firstElement } from '../../base/utility/firstElement';
import { ROLE } from '../../../configuration/constans/roles';
import { isUndefined } from '../../base/utility/isUndefined';
import { Message } from '../../../models/Message.model';
import { parseMessages } from 'helpers/messages-parser';
import { authStore, AuthStore } from '../state/auth.store';

export class ProjectsFacade extends StoreManagement<ProjectsStore, ProjectsService, ProjectsQuery, ProjectsState, ProjectsEntityState> {
	readonly detailedProject$ = this.baseQuery.detailedProject$;

	readonly detailedProjectMessages$ = this.baseQuery.detailedProjectMessages$;

	readonly filteredProjects$ = this.baseQuery.filteredProjects$;

	readonly projects$ = this.baseQuery.projects$;

	readonly personalProjects$ = this.baseQuery.personalProjects$;

	readonly totalPages$ = this.baseQuery.totalPages$;

	readonly filter$ = this.baseQuery.filter$;

	readonly currentPage$ = this.baseQuery.currentPage$;

	readonly isProcessing$ = this.baseQuery.isProcessing$;

	constructor(projectsService: ProjectsService, projectsStore: ProjectsStore, projectsQuery: ProjectsQuery, private authStore: AuthStore) {
		super(projectsService, projectsStore, projectsQuery);
	}

	private get currentUserId(): number {
		const {
			user: { id },
		} = this.authStore.getValue();
		return id;
	}

	async getProjects() {
		await this.baseAsyncHandler(async () => {
			const { data } = await this.baseService.getProjects();
			const parsedProjects = ProjectsFacade.parseToProjectsWithDates(data);
			console.log(parsedProjects);
			this.updatePersonalProjects(parsedProjects);
			this.updateStateEntity<Project[]>('projects', ProjectsFacade.sortByDateDesc(parsedProjects));
		});
	}

	async getProjectById(projectId: number, onError: RunnableFunction) {
		await this.getProjects();
		this.projects$.pipe(first()).subscribe((projects: Project[]) => {
			const detailedProjectIfFound = projects.find(({ id }) => id === projectId);
			if (isUndefined(detailedProjectIfFound)) {
				onError();
				return;
			}

			const { projectMessages, ...detailedProject } = detailedProjectIfFound as Project;
			this.updateStateEntity<Message[]>('detailedProjectMessages', this.parseMessages(projectMessages as Message[]));
			this.updateStateEntity<Project>('detailedProject', detailedProject);
		});
	}

	async takeProject(projectId: string, afterSuccessHandler: RunnableFunction, afterErrorHandler: RunnableFunction) {
		await this.baseAsyncHandler(
			async () => {
				await this.baseService.takeProject(projectId);
				await this.getProjects();
			},
			afterSuccessHandler,
			afterErrorHandler
		);
	}

	async closeProject(projectId: string, afterSuccessHandler: RunnableFunction, afterErrorHandler: RunnableFunction) {
		await this.baseAsyncHandler(async () => await this.baseService.closeProject(projectId), afterSuccessHandler, afterErrorHandler);
	}

	async sendProjectMessage(projectId: string, message: string) {
		await this.baseAsyncHandler(async () => {
			const {
				data: { projectMessages },
			} = await this.baseService.sendProjectMessage({ projectId, message });
			this.updateStateEntity<Message[]>('detailedProjectMessages', this.parseMessages(projectMessages));
		});
	}

	private static parseToPersonalProjects(user: User): Project[] {
		const { roles } = user;
		const isAuthor = firstElement(roles) === ROLE.AUTHOR;
		const roleEntity = isAuthor ? 'projectsAuthor' : 'projectsMaker';
		return ProjectsFacade.parseToProjectsWithDates(user[roleEntity] as Project[]);
	}

	private static parseToProjectsWithDates(projects: Project[]): Project[] {
		return projects.map((project) => ({
			...project,
			createdAt: new Date(project.createdAt),
			updatedAt: new Date(project.updatedAt),
		}));
	}

	private parseMessages(messages: Message[]): Message[] {
		return parseMessages(messages, this.currentUserId);
	}

	private updatePersonalProjects(projects: Project[]): void {
		const personalProjects = projects.filter(({ authorId, makerId }) => makerId || authorId === this.currentUserId);
		console.log(personalProjects);
		this.updateStateEntity<Project[]>('personalProjects', personalProjects);
	}

	private static sortByDateDesc(projects: Project[]): Project[] {
		return projects.sort((previous, current) => current.createdAt.getTime() - previous.createdAt.getTime());
	}

	updateFilter(filter: ProjectVisibilityFilter): void {
		this.updateStateEntity<number>('currentPage', 1);
		this.updateStateEntity<ProjectVisibilityFilter>('filter', filter);
	}

	updateCurrentPage(currentPage: number): void {
		this.updateStateEntity<number>('currentPage', currentPage);
	}

	savePersonalProjects(user: User): void {
		this.updateStateEntity('personalProjects', ProjectsFacade.parseToPersonalProjects(user));
	}

	resetDetailedProject(): void {
		this.updateStateEntity<null>('detailedProject', null);
	}

	resetFilters(): void {
		this.updateStateEntity('filter', ProjectVisibilityFilter.SHOW_ACTIVE);
		this.updateStateEntity('currentPage', 1);
	}
}

// // @todo - this should be part of a formal DI system
export const projectsFacade = new ProjectsFacade(projectsService, projectsStore, projectsQuery, authStore);
