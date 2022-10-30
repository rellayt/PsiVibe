import { Project } from './Project.model';
import { ProfileData } from '../core/store/services/profile.service';

export interface User extends ProfileData {
	id: number;
	username: string;
	email: string;
	roles: string[];
	projectsAuthor?: Project[];
	projectsMaker?: Project[];
	image?: string;
	createdAt: Date;
	updatedAt: Date;
}

export const PERSONAL_DATA_KEYS = ['firstName', 'lastName', 'phone', 'birthDate'];

export interface PersonalData {
	user?: string;
	firstName?: string;
	lastName?: string;
	phone?: string;
	birthDate?: string;
}

export const ADDRESS_KEYS = ['city', 'state', 'country'];

export interface Address {
	user?: string;
	city?: string;
	state?: string;
	country?: string;
}

export interface Avatar {
	imagePath?: string;
}

export interface Profile {
	user: User;
	address: Address;
	personalData: PersonalData;
	avatar: Avatar;
}
