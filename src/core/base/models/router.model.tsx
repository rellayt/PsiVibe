import { FC } from 'react';

export interface SingleRoute<T = any> {
	path: string;
	component: FC;
}

export interface MainRoutes {
	authenticated: SingleRoute[];
	unauthenticated: SingleRoute[];
}
