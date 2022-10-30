import React, { ReactElement, useContext, useState } from 'react';
import { Wrapper } from './SetPassword.styles';
import Button from '../../atoms/Button/Button';
import { isFalseValue } from '../../../core/base/utility/isFalseValue';
import { isEveryElementTouched } from '../../../core/base/utility/isEveryElementTouched';
import { useFormik } from 'formik';
import { SetPasswordSchema } from '../../../configuration/schemas/SetPasswordSchema';
import { TextField } from '../../atoms/TextField/TextField';
import { IconButton } from '@material-ui/core';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Key } from '../../../core/base/types/key.type';
import { useProfile } from '../../../hooks/useProfile';
import { openSnackbar } from '../../../core/store/actions/snackbar.actions';
import { SnackbarMessage } from '../../../configuration/constans/snackbar-message';
import { snackbarContext } from '../../../core/providers/Snackbar.provider';
import { isTrueValue } from '../../../core/base/utility/isTrueValue';
import { AsyncErrorMessage } from '../../../configuration/constans/async-error-message';

export interface SetPasswordData<T = string> {
	oldPassword: T;
	newPassword: T;
	newPasswordConfirm?: T;
}

const SET_PASSWORD_INITIAL_VALUES: SetPasswordData = { oldPassword: '', newPassword: '', newPasswordConfirm: '' };

const SetPassword = (): ReactElement => {
	const { isProcessing, isAsyncError, facade } = useProfile();

	const { snackbarDispatch } = useContext(snackbarContext);

	const [passwordsStatus, setPasswordsStatus] = useState<SetPasswordData<boolean>>({
		oldPassword: false,
		newPassword: false,
		newPasswordConfirm: false,
	});

	const afterSuccessHandler = () => openSnackbar(snackbarDispatch, SnackbarMessage.CHANGE_PASSWORD_SUCCESS);

	const afterErrorHandler = () => openSnackbar(snackbarDispatch, SnackbarMessage.CHANGE_PASSWORD_ERROR);

	const handleTogglePassword = (key: Key<SetPasswordData>) => {
		const passwordValue = passwordsStatus[key];
		setPasswordsStatus({ ...passwordsStatus, [key]: !passwordValue });
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
	} = useFormik<SetPasswordData>({
		initialValues: SET_PASSWORD_INITIAL_VALUES,
		validationSchema: SetPasswordSchema,
		validateOnChange: true,
		onSubmit: async ({ newPassword, oldPassword }) => {
			resetForm();
			await facade.changePassword({ newPassword, oldPassword }, afterSuccessHandler, afterErrorHandler);
		},
		validate: () => {
			if (isTrueValue(isAsyncError)) facade.resetAsyncError();
		},
	});

	return (
		<Wrapper>
			<TextField
				label="Poprzednie hasło"
				name="oldPassword"
				type={passwordsStatus.oldPassword ? 'text' : 'password'}
				value={values.oldPassword}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={isProcessing}
				error={isAsyncError || Boolean(errors.oldPassword && touched.oldPassword)}
				helperText={
					isAsyncError
						? AsyncErrorMessage.SET_PASSWORD_ERROR_MESSAGE
						: Boolean(errors.oldPassword && touched.oldPassword) && errors.oldPassword
				}
				InputProps={{
					endAdornment: (
						<IconButton onClick={() => handleTogglePassword('oldPassword')}>
							{passwordsStatus.oldPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					),
				}}
			/>
			<TextField
				label="Nowe hasło"
				name="newPassword"
				type={passwordsStatus.newPassword ? 'text' : 'password'}
				value={values.newPassword}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={isProcessing}
				error={isAsyncError || Boolean(errors.newPassword && touched.newPassword)}
				helperText={isAsyncError ? '' : Boolean(errors.newPassword && touched.newPassword) && errors.newPassword}
				InputProps={{
					endAdornment: (
						<IconButton onClick={() => handleTogglePassword('newPassword')}>
							{passwordsStatus.newPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					),
				}}
			/>
			<TextField
				label="Powtórz hasło"
				name="newPasswordConfirm"
				type={passwordsStatus.newPasswordConfirm ? 'text' : 'password'}
				value={values.newPasswordConfirm}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={isProcessing}
				error={isAsyncError || Boolean(errors.newPasswordConfirm && touched.newPasswordConfirm)}
				helperText={isAsyncError ? '' : Boolean(errors.newPasswordConfirm && touched.newPasswordConfirm) && errors.newPasswordConfirm}
				InputProps={{
					endAdornment: (
						<IconButton onClick={() => handleTogglePassword('newPasswordConfirm')}>
							{passwordsStatus.newPasswordConfirm ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					),
				}}
			/>
			<Button
				disabled={isFalseValue(isValid) || isValidating || isEveryElementTouched(touched)}
				onClick={submit}
				fullWidth
				processing={isProcessing}
				type={'submit'}
				color={'yellow'}>
				Zmień hasło
			</Button>
		</Wrapper>
	);
};

export default SetPassword;
