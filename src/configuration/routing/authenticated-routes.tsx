import { SingleRoute } from 'core/base/models/router.model';
import Dashboard from 'views/Dashboard';
import Profile from 'views/Profile';
import ProjectDetails from 'views/ProjectDetails';
import Chat from '../../views/Chat';
import { RoutePath } from './static-routes';
import SelectedProfile from '../../views/SelectedProfile';
import PersonalProjects from '../../views/PersonalProjects';

export const authenticatedRoutes: SingleRoute[] = [
	{
		path: RoutePath.BLOG,
		component: Chat,
	},
	{
		path: RoutePath.ABOUT_ME,
		component: Dashboard,
	},
	{
		path: `${RoutePath.PRICE_LIST}/:id`,
		component: SelectedProfile,
	},
	{
		path: RoutePath.PRICE_LIST,
		component: Profile,
	},
	{
		path: RoutePath.PERSONAL_PROJECTS,
		component: PersonalProjects,
	},
	{
		path: `${RoutePath.PROJECT_DETAILS}/:id`,
		component: ProjectDetails,
	},
];
