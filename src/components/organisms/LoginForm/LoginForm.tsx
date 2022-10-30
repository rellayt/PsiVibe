import React, { ReactElement, useState } from 'react';
import { TextFieldsWrapper } from '../../templates/AuthCard/AuthCard.styles';
import { TextField } from '../../atoms/TextField/TextField';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import { IconButton } from '@material-ui/core';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Button from '../../atoms/Button/Button';
import { LoginSchema } from '../../../configuration/schemas/LoginSchema';
import { useFormik } from 'formik';
import { LoginCredentials } from '../../../views/Login';
import { isFalseValue } from '../../../core/base/utility/isFalseValue';
import { isEveryElementTouched } from '../../../core/base/utility/isEveryElementTouched';
import { isTrueValue } from '../../../core/base/utility/isTrueValue';
import { AsyncErrorMessage } from '../../../configuration/constans/async-error-message';

interface LoginFormProps {
	isProcessing?: boolean;
	isAsyncError?: boolean;
	handleSubmit: Function;
	resetError: Function;
}

const LOGIN_INITIAL_VALUES: LoginCredentials = {
	username: '',
	password: '',
};

const LoginForm = ({ isProcessing, isAsyncError, handleSubmit, resetError }: LoginFormProps): ReactElement => {
	const [isPasswordShown, toggleIsPasswordShown] = useState(false);

	const handleKeyPress = (event: KeyboardEvent) => {
		if (event.key === 'Enter') submit();
	};

	const {
		values,
		handleBlur,
		touched,
		errors,
		resetForm,
		isValidating,
		handleChange,
		handleSubmit: submit,
		isValid,
	} = useFormik<LoginCredentials>({
		initialValues: LOGIN_INITIAL_VALUES,
		validationSchema: LoginSchema,
		validateOnChange: true,
		onSubmit: (values) => {
			resetForm();
			handleSubmit(values);
		},
		validate: () => {
			if (isTrueValue(isAsyncError)) resetError();
		},
	});

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
					disabled={isProcessing}
					onKeyPress={handleKeyPress}
					error={isAsyncError || Boolean(errors.username && touched.username)}
					helperText={isAsyncError ? '' : Boolean(errors.username && touched.username) && errors.username}
					InputProps={{
						startAdornment: <SupervisorAccountOutlinedIcon />,
					}}
				/>

				<TextField
					label="Hasło"
					name="password"
					type={isPasswordShown ? 'text' : 'password'}
					value={values.password}
					onChange={handleChange}
					onBlur={handleBlur}
					disabled={isProcessing}
					onKeyPress={handleKeyPress}
					error={isAsyncError || Boolean(errors.password && touched.password)}
					helperText={
						isAsyncError ? AsyncErrorMessage.LOGIN_ERROR_MESSAGE : Boolean(errors.password && touched.password) && errors.password
					}
					InputProps={{
						endAdornment: <IconButton onClick={handleTogglePassword}>{isPasswordShown ? <Visibility /> : <VisibilityOff />}</IconButton>,
						startAdornment: <LockOpenIcon />,
					}}
				/>
			</TextFieldsWrapper>
			<Button
				disabled={isFalseValue(isValid) || isValidating || isEveryElementTouched(touched) || (!values.username && !values.password)}
				onClick={submit}
				processing={isProcessing}
				type={'submit'}
				fullWidth
				color={'yellow'}>
				Zaloguj
			</Button>
		</>
	);
};

export default LoginForm;
