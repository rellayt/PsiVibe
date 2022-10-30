import MainTemplate from 'components/templates/MainTemplate/MainTemplate';
import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import routes from 'configuration/routing/routes';
import { SingleRoute } from 'core/base/models/router.model';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Switch } from '../configuration/routing/Switch.styles';
import { RoutePath } from '../configuration/routing/static-routes';

const DEFAULT_AUTHENTICATED_PATH = '/dashboard';

axios.interceptors.request.use(
	(request: any) => {
		const cookies = new Cookies();
		const token = cookies.get('token');
		if (token) {
			const httpMethods = ['post', 'put', 'get', 'delete'];
			httpMethods.forEach((method) => (request.headers[method]['Authorization'] = `Bearer ${token}`));
		}
		return request;
	},
	(error) => Promise.reject(error)
);

const AuthenticatedApp = (): React.ReactElement => {
	return (
		<MainTemplate>
			<Switch atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }}>
				{routes.authenticated.map((singleRoute: SingleRoute, index) => (
					<Route path={singleRoute.path} component={singleRoute.component} key={index} />
				))}
				<Redirect exact from={RoutePath.PROFILE_EDIT} to={`${RoutePath.PROFILE_EDIT}/personal-data`} />
				<Route exact path="/">
					<Redirect to={DEFAULT_AUTHENTICATED_PATH} />
				</Route>
				<Route path="*">
					<Redirect to={DEFAULT_AUTHENTICATED_PATH} />
				</Route>
			</Switch>
		</MainTemplate>
	);
};

export default AuthenticatedApp;
