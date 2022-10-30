import { Message } from './Message.model';

export enum ProjectStatus {
	NEW = 'NEW',
	IN_PROGRESS = 'IN_PROGRESS',
	FINISHED = 'FINISHED',
}

export interface Project {
	id: number;
	title: string;
	description: string;
	authorId: number;
	makerId?: number;
	authorUsername: string;
	projectStatus: ProjectStatus;
	projectMessages?: Message[];
	createdAt: Date;
	updatedAt: Date;
}
