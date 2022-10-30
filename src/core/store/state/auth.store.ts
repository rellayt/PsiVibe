import { EntityStore, StoreConfig } from '@datorama/akita';
import { QueryEntity } from '@datorama/akita';
import { AuthState, AuthEntityState } from '../models/Auth.model';
import { isNotUndefined } from '../../base/utility/isNotUndefined';
import { asNonUndefined } from '../../base/utility/asNonUndefined';
import { firstElement } from '../../base/utility/firstElement';
import { ROLE } from '../../../configuration/constans/roles';

export const AUTH_INITIAL_STATE: AuthState = { user: null, isPageLoading: true, isAuthor: null };

@StoreConfig({ name: 'Auth' })
export class AuthStore extends EntityStore<AuthEntityState, AuthState> {
	constructor() {
		super(AUTH_INITIAL_STATE);
	}
}

export class AuthQuery extends QueryEntity<AuthEntityState, AuthState> {
	isAuthenticated$ = this.select(({ user }) => Boolean(user));

	user$ = this.select(({ user }) => user);

	isAuthor$ = this.select(({ user }) => {
		if (isNotUndefined(user)) {
			const { roles } = asNonUndefined(user);
			return firstElement(roles) === ROLE.AUTHOR;
		}
		return null;
	});

	isError$ = this.selectError();

	isPageLoading$ = this.select(({ isPageLoading }) => isPageLoading);

	isProcessing$ = this.selectLoading();

	constructor(protected store: AuthStore) {
		super(store);
	}
}

export const authStore = new AuthStore();

export const authQuery = new AuthQuery(authStore);
