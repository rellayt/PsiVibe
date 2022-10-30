import { ApiService } from './api.service';
import { Project } from '../../../models/Project.model';
import { BaseResponseData } from '../../base/models/baseResponseData';
import { Message } from '../../../models/Message.model';

export interface ProjectsResponseData extends BaseResponseData<Project[]> {}

export interface ProjectMessagesData extends BaseResponseData<{ projectMessages: Message[] }> {}

export interface ProjectMessagePayload {
	message: string;
	projectId: string;
}

export class ProjectsService {
	private apiService: ApiService;

	constructor() {
		this.apiService = new ApiService();
	}

	getProjects(): Promise<ProjectsResponseData> {
		return this.apiService.get<ProjectsResponseData>('project/all');
	}

	takeProject(projectId: string): Promise<never> {
		return this.apiService.post<never>('project/take', { params: { projId: projectId } });
	}

	closeProject(projectId: string): Promise<never> {
		return this.apiService.post<never>('project/finish', { params: { projId: projectId } });
	}

	sendProjectMessage({ projectId, message }: ProjectMessagePayload): Promise<ProjectMessagesData> {
		return this.apiService.post<ProjectMessagesData>(`project/${projectId}/send-message`, { body: { message } });
	}

	addReview(): any {}
}

export const projectsService = new ProjectsService();
