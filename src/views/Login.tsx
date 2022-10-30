import React, { ReactElement, useContext } from 'react';
import Link from '../components/atoms/Link/Link';
import AuthCard from '../components/templates/AuthCard/AuthCard';
import { Header, HeaderWrapper, LoginWrapper } from '../components/templates/AuthCard/AuthCard.styles';
import LoginForm from '../components/organisms/LoginForm/LoginForm';
import { useAuth } from '../hooks/useAuth';
import { openSnackbar } from '../core/store/actions/snackbar.actions';
import { snackbarContext } from '../core/providers/Snackbar.provider';
import useEffectOnce from '../helpers/use-effect-once';
import { RoutePath } from '../configuration/routing/static-routes';
import { SnackbarMessage } from '../configuration/constans/snackbar-message';

export interface LoginCredentials {
	username: string;
	password: string;
}

const Login = (): ReactElement => {
	const { isProcessing, isError, facade } = useAuth();

	const { snackbarDispatch } = useContext(snackbarContext);

	const handleSubmit = async (loginCredentials: LoginCredentials) => {
		await facade.login(
			loginCredentials,
			() => openSnackbar(snackbarDispatch, SnackbarMessage.LOGIN_SUCCESS),
			() => openSnackbar(snackbarDispatch, SnackbarMessage.LOGIN_ERROR)
		);
	};

	const resetAsyncError = () => facade.resetAsyncError();

	useEffectOnce(() => facade.resetAsyncError());

	return (
		<LoginWrapper>
			<AuthCard>
				<HeaderWrapper>
					<Header>Logowanie</Header>
					<Link navigateTo={RoutePath.REGISTER}>Nie mam konta</Link>
				</HeaderWrapper>
				<LoginForm isProcessing={isProcessing} isAsyncError={isError} handleSubmit={handleSubmit} resetError={resetAsyncError} />
			</AuthCard>
		</LoginWrapper>
	);
};

export default Login;
