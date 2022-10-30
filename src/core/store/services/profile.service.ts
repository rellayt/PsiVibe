import { ApiService } from './api.service';
import { MakerStatus } from '../../../models/MakerStatus.model';
import { SetPasswordData } from '../../../components/organisms/SetPassword/SetPassword';
import { BaseResponseData } from '../../base/models/baseResponseData';
import { UserResponseData } from './auth.service';

export interface ProfileData {
	makerStatus?: MakerStatus;
	firstName?: string;
	lastName?: string;
	phone?: string;
	birthDate?: string;
	city?: string;
	state?: string;
	country?: string;
	zipCode?: string;
}

export interface ProfileResponseData extends BaseResponseData<ProfileData> {}

export class ProfileService {
	private apiService: ApiService;

	constructor() {
		this.apiService = new ApiService();
	}

	changePassword(passwordData: SetPasswordData): Promise<never> {
		return this.apiService.post<never>('user/change-pwd', { body: { ...passwordData } });
	}

	updateProfile(profileData: ProfileData): Promise<ProfileResponseData> {
		return this.apiService.post<ProfileResponseData>('user/update-data', { body: { ...profileData } });
	}

	findProfile(id: string): Promise<UserResponseData> {
		return this.apiService.get<UserResponseData>(`user/view/${id}`);
	}

	uploadAvatar(file: File) {
		const formData = new FormData();
		formData.append('image', file, file.name);
		return this.apiService.post<never>('user/upload-image', { formData });
	}
}

export const profileService = new ProfileService();
