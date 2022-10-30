import { EntityState } from '@datorama/akita';
import { Project } from '../../../models/Project.model';
import { Nullable } from '../../base/types/nullable.type';
import { Message } from '../../../models/Message.model';

export interface ProjectsState {
	projects: Project[];
	detailedProject: Nullable<Project>;
	personalProjects: Project[];
	detailedProjectMessages: Message[];
	filter: ProjectVisibilityFilter;
	currentPage: number;
}

export interface ProjectsEntityState extends EntityState<ProjectsState> {}

export enum ProjectVisibilityFilter {
	SHOW_ALL = 'SHOW_ALL',
	SHOW_ACTIVE = 'SHOW_ACTIVE',
	SHOW_INACTIVE = 'SHOW_INACTIVE',
}
