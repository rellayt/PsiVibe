import { Nullable } from '../../base/types/nullable.type';
import { EntityState } from '@datorama/akita';
import { User } from '../../../models/User.model';

export interface AuthState {
	user: Nullable<User>;
	isAuthor: Nullable<Boolean>;
	isPageLoading: boolean;
}

export interface AuthEntityState extends EntityState<AuthState> {}
