import React, { ReactElement, useEffect, useState } from 'react';
import { Captcha, TextFieldsWrapper } from '../../templates/AuthCard/AuthCard.styles';
import { TextField } from '../../atoms/TextField/TextField';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { IconButton } from '@material-ui/core';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import Select from '../../atoms/Select/Select';
import { ROLE, ROLES } from '../../../configuration/constans/roles';
import { SITE_KEY } from '../../../configuration/constans/site-key';
import Button from '../../atoms/Button/Button';
import { useFormik } from 'formik';
import { BaseRegisterCredentials } from '../../../views/Register';
import { RegisterSchema } from '../../../configuration/schemas/RegisterSchema';
import { isFalseValue } from '../../../core/base/utility/isFalseValue';
import { isEveryElementTouched } from '../../../core/base/utility/isEveryElementTouched';
import { Nullable } from '../../../core/base/types/nullable.type';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { asNonUndefined } from '../../../core/base/utility/asNonUndefined';

interface RegisterFormProps {
	isProcessing?: boolean;
	handleSubmit: Function;
	definedRole?: Nullable<ROLE>;
}

const REGISTER_INITIAL_VALUES: BaseRegisterCredentials<string> = {
	username: '',
	email: '',
	password: '',
	roles: '',
};

export const RegisterForm = ({ isProcessing, handleSubmit, definedRole }: RegisterFormProps): ReactElement => {
	const {
		values,
		handleBlur,
		touched,
		errors,
		isValidating,
		resetForm,
		setFieldValue,
		handleChange,
		handleSubmit: submit,
		isValid,
	} = useFormik<BaseRegisterCredentials<string>>({
		initialValues: REGISTER_INITIAL_VALUES,
		validationSchema: RegisterSchema,
		validateOnBlur: true,
		validateOnMount: true,
		onSubmit: (values) => {
			resetForm();
			handleSubmit({ ...values, roles: [values.roles] });
		},
		initialStatus: false,
	});
	const [isPasswordShown, toggleIsPasswordShown] = useState(false);

	const [isCaptchaMarked, setIsCaptchaMarked] = useState(false);

	const handleKeyPress = (event: KeyboardEvent) => {
		if (event.key === 'Enter') submit();
	};

	useEffect(() => {
		if (definedRole) {
			const roleKey = Object.entries(ROLE).find(([key]) => key === definedRole);
			const role = ROLES.find((value) => asNonUndefined(roleKey)[1] === value.key);
			setFieldValue('roles', role?.key);
		}
	}, [definedRole]);

	const handleCaptchaStatus = (value: Nullable<string>): void => setIsCaptchaMarked(!!value);

	const handleTogglePassword = () => toggleIsPasswordShown(!isPasswordShown);

	return (
		<>
			<TextFieldsWrapper>
				<TextField
					label="Nazwa"
					name="username"
					value={values.username}
					onChange={handleChange}
					onBlur={handleBlur}
					onKeyPress={handleKeyPress}
					disabled={isProcessing}
					error={Boolean(errors.username && touched.username)}
					helperText={Boolean(errors.username && touched.username) && errors.username}
					InputProps={{
						startAdornment: <AccountCircleOutlinedIcon />,
					}}
				/>
				<TextField
					label="E-mail"
					name="email"
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
					onKeyPress={handleKeyPress}
					disabled={isProcessing}
					error={Boolean(errors.email && touched.email)}
					helperText={Boolean(errors.email && touched.email) && errors.email}
					InputProps={{
						startAdornment: <MailOutlineIcon />,
					}}
				/>
				<TextField
					label="Hasło"
					name="password"
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					onKeyPress={handleKeyPress}
					disabled={isProcessing}
					error={Boolean(errors.password && touched.password)}
					helperText={Boolean(errors.password && touched.password) && errors.password}
					type={isPasswordShown ? 'text' : 'password'}
					InputProps={{
						endAdornment: <IconButton onClick={handleTogglePassword}>{isPasswordShown ? <Visibility /> : <VisibilityOff />}</IconButton>,
						startAdornment: <HttpsOutlinedIcon />,
					}}
				/>
				<Select
					label="Rola"
					name="roles"
					value={values.roles}
					onChange={handleChange}
					onKeyPress={handleKeyPress}
					disabled={isProcessing || !!definedRole}
					options={ROLES}
					InputProps={{
						startAdornment: <GroupsOutlinedIcon />,
					}}
				/>
				<Captcha sitekey={SITE_KEY} onChange={handleCaptchaStatus} />
			</TextFieldsWrapper>
			<Button
				fullWidth
				color={'blue'}
				disabled={isFalseValue(isValid) || isValidating || isEveryElementTouched(touched) || isFalseValue(isCaptchaMarked)}
				processing={isProcessing}
				onClick={submit}
				type={'submit'}>
				Zarejestruj
			</Button>
		</>
	);
};

export default RegisterForm;
