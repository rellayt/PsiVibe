import { authFacade as facade, AuthFacade } from '../core/store/facades/auth.facade';
import { useObservable } from '@mindspace-io/react';
import { Optional } from '../core/base/types/optional.type';
import { User } from '../models/User.model';
import { Nullable } from '../core/base/types/nullable.type';

export type AuthHook = {
	isAuthenticated: Optional<boolean>;
	isProcessing: Optional<boolean>;
	isError: Optional<boolean>;
	isPageLoading: Optional<boolean>;
	user: Optional<User>;
	isAuthor: Optional<Nullable<boolean>>;
	facade: AuthFacade;
};

export const useAuth = (): AuthHook => {
	const [isProcessing] = useObservable<boolean>(facade.isProcessing$, false);

	const [isAuthenticated] = useObservable<boolean>(facade.isAuthenticated$, false);

	const [isPageLoading] = useObservable<boolean>(facade.isPageLoading$, true);

	const [user] = useObservable<User>(facade.user$);

	const [isAuthor] = useObservable<Nullable<boolean>>(facade.isAuthor$);

	const [isError] = useObservable<boolean>(facade.error$, false);

	return { isAuthenticated, isProcessing, isAuthor, isPageLoading, user, isError, facade };
};
