import { MainRoutes, SingleRoute } from 'core/base/models/router.model';
import { authenticatedRoutes } from './authenticated-routes';
import { unauthenticatedRoutes } from './unauthenticated-routes';
import SetPassword from '../../components/organisms/SetPassword/SetPassword';
import SetAddress from '../../components/organisms/SetAddress/SetAddress';
import SetPersonalData from '../../components/organisms/SetPersonalData/SetPersonalData';
import SetAvatar from '../../components/organisms/SetAvatar/SetAvatar';
import { RoutePath } from './static-routes';

const routes: MainRoutes = {
	authenticated: authenticatedRoutes,
	unauthenticated: unauthenticatedRoutes,
};

export const profileEditInnerRoutes: SingleRoute[] = [
	{
		path: `${RoutePath.PROFILE_EDIT}/password`,
		component: SetPassword,
	},
	{
		path: `${RoutePath.PROFILE_EDIT}/personal-data`,
		component: SetPersonalData,
	},
	{
		path: `${RoutePath.PROFILE_EDIT}/address`,
		component: SetAddress,
	},
	{
		path: `${RoutePath.PROFILE_EDIT}/avatar`,
		component: SetAvatar,
	},
];

export default routes;
