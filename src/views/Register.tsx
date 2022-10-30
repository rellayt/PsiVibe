import React, { ReactElement, useEffect, useState } from 'react';
import Link from '../components/atoms/Link/Link';
import AuthCard from '../components/templates/AuthCard/AuthCard';
import { Header, HeaderWrapper, RegisterWrapper } from '../components/templates/AuthCard/AuthCard.styles';
import { useAuth } from '../hooks/useAuth';
import { isTrueValue } from '../core/base/utility/isTrueValue';
import { useRouter } from '../hooks/useRouter';
import RegisterForm from '../components/organisms/RegisterForm/RegisterForm';
import { RoutePath } from '../configuration/routing/static-routes';
import useEffectOnce from '../helpers/use-effect-once';
import { isUndefined } from '../core/base/utility/isUndefined';
import { ROLE } from '../configuration/constans/roles';
import { Nullable } from '../core/base/types/nullable.type';
import { asNonUndefined } from '../core/base/utility/asNonUndefined';
import { Modal } from '@mui/material';
import { BoxContent, BoxHeader, StyledBox } from '../components/atoms/Box/Box';
import Button from '../components/atoms/Button/Button';

export interface BaseRegisterCredentials<T> {
	username: string;
	email: string;
	password: string;
	roles: T;
}

type QueryRole = { query: { role?: string } };

const Register = (): ReactElement => {
	const router = useRouter();

	const { isAuthenticated, isProcessing, facade } = useAuth();

	const [openModal, setOpenModal] = React.useState(false);

	const [definedRole, setDefinedRole] = useState<Nullable<ROLE>>(null);

	const handleSubmit = async (registerCredentials: BaseRegisterCredentials<string[]>) => {
		await facade.register(registerCredentials, afterSuccessHandler);
	};

	const afterSuccessHandler = () => setOpenModal(true);

	const handleCloseModal = () => {
		router.push(RoutePath.LOGIN);
		setOpenModal(false);
	};

	useEffectOnce(() => {
		const { query }: QueryRole = router;

		if (isUndefined(query.role)) return;

		if (asNonUndefined(query.role) in ROLE) {
			setDefinedRole(query.role as ROLE);
			return;
		}

		router.replace(RoutePath.REGISTER);
	});

	useEffect(() => {
		if (isTrueValue(isAuthenticated)) router.push(RoutePath.ABOUT_ME);
	}, [isAuthenticated, router]);

	return (
		<>
			<RegisterWrapper>
				<AuthCard>
					<HeaderWrapper>
						<Header>Rejestracja</Header>
						<Link navigateTo={RoutePath.LOGIN} color={'blue'}>
							Mam konto
						</Link>
					</HeaderWrapper>
					<RegisterForm handleSubmit={handleSubmit} definedRole={definedRole} isProcessing={isProcessing} />
				</AuthCard>
			</RegisterWrapper>
			<Modal open={openModal} onClose={handleCloseModal}>
				<StyledBox>
					<BoxHeader>Wstępna rejestracja przebiegła pomyślnie</BoxHeader>
					<BoxContent>Na Twój adres e-mail został wysłany link aktywacyjny w celu ukończenia procesu rejestracji</BoxContent>
					<Button onClick={handleCloseModal} color={'yellow'}>
						Zamknij
					</Button>
				</StyledBox>
			</Modal>
		</>
	);
};

export default Register;
