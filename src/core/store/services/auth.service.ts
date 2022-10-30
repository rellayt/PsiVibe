import { LoginCredentials } from '../../../views/Login';
import { ApiService } from './api.service';
import { BaseRegisterCredentials } from '../../../views/Register';
import { User } from '../../../models/User.model';
import { BaseResponseData } from '../../base/models/baseResponseData';

export interface LoginResponseData extends BaseResponseData<string> {}

export interface UserResponseData extends BaseResponseData<User> {}

export class AuthService {
	private apiService: ApiService;

	constructor() {
		this.apiService = new ApiService();
	}

	login(credentials: LoginCredentials): Promise<LoginResponseData> {
		return this.apiService.post<LoginResponseData>('user/login', { body: { ...credentials } });
	}

	register(credentials: BaseRegisterCredentials<string[]>): Promise<void> {
		return this.apiService.post<void>('user/register', { body: { ...credentials } });
	}

	checkName(username: string): Promise<LoginResponseData> {
		return this.apiService.post<LoginResponseData>('user/inuse', { params: { username } });
	}

	checkEmail(email: string): Promise<LoginResponseData> {
		return this.apiService.post<LoginResponseData>('user/inuse', { params: { email } });
	}

	currentUser(token?: string): Promise<UserResponseData> {
		const headers = token ? { headers: { Authorization: token } } : undefined;
		return this.apiService.get<UserResponseData>('user/me', {
			...headers,
		});
	}
}

export const authService = new AuthService();
