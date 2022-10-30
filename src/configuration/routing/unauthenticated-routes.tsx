import { SingleRoute } from 'core/base/models/router.model';
import Home from '../../views/Home';
import Login from '../../views/Login';
import Register from '../../views/Register';

export const unauthenticatedRoutes: SingleRoute[] = [
	{
		path: '/home',
		component: Home,
	},
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/register',
		component: Register,
	},
];
