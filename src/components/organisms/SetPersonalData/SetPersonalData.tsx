import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Wrapper } from './SetPersonalData.styles';
import { useProfile } from '../../../hooks/useProfile';
import { openSnackbar } from '../../../core/store/actions/snackbar.actions';
import { snackbarContext } from '../../../core/providers/Snackbar.provider';
import { TextField } from '../../atoms/TextField/TextField';
import { useFormik } from 'formik';
import { PersonalData } from '../../../models/User.model';
import Button from '../../atoms/Button/Button';
import { IMaskInput } from 'react-imask';
import { PersonalDataSchema } from '../../../configuration/schemas/PersonalDataSchema';
import { isFalseValue } from '../../../core/base/utility/isFalseValue';
import { ProfileSegment } from '../../../core/store/facades/profile.facade';
import { SnackbarMessage } from '../../../configuration/constans/snackbar-message';

const PhoneMaskCustom = React.forwardRef(function PhoneMaskCustom(props: any, ref) {
	const { onChange, ...other } = props;
	return (
		<IMaskInput
			{...other}
			mask="(+48) 000-000-000"
			inputRef={ref}
			onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
			overwrite
		/>
	);
});

const BirthDateMaskCustom = React.forwardRef(function PhoneMaskCustom(props: any, ref) {
	const { onChange, ...other } = props;
	return (
		<IMaskInput
			{...other}
			mask="00/00/0000"
			inputRef={ref}
			onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
			overwrite
		/>
	);
});

const PERSONAL_DATA_INITIAL_VALUES: PersonalData = {
	firstName: '',
	lastName: '',
	birthDate: '',
	phone: '',
};

const SetPersonalData = (): ReactElement => {
	const { personalData, isProcessing, facade } = useProfile();

	const { snackbarDispatch } = useContext(snackbarContext);

	const [personalDataInitialState, setPersonalDataInitialState] = useState<PersonalData>(PERSONAL_DATA_INITIAL_VALUES);

	useEffect(() => {
		if (personalData) {
			const personalDataWithoutNullValues = Object.fromEntries(Object.entries(personalData).filter(([_, v]) => v != null));
			setPersonalDataInitialState({ ...PERSONAL_DATA_INITIAL_VALUES, ...personalDataWithoutNullValues });
		}
	}, [personalData]);

	const afterSuccessHandler = () => openSnackbar(snackbarDispatch, SnackbarMessage.UPDATE_PERSONAL_DATA_SUCCESS);

	const afterErrorHandler = () => openSnackbar(snackbarDispatch, SnackbarMessage.STANDARD_ERROR);

	const {
		values,
		handleBlur,
		touched,
		errors,
		isValidating,
		handleChange,
		handleSubmit: submit,
		isValid,
	} = useFormik<PersonalData>({
		initialValues: personalDataInitialState,
		enableReinitialize: true,
		validateOnChange: false,
		validationSchema: PersonalDataSchema,
		onSubmit: async (values) => {
			const { phone, birthDate } = values;
			const personalData = { ...values, phone: phone?.substring(6, phone.length), birthDate: birthDate?.replaceAll('/', '-') };
			await facade.updateProfile(personalData, ProfileSegment.PERSONAL_DATA, afterSuccessHandler, afterErrorHandler);
		},
	});

	return (
		<Wrapper>
			<TextField
				label="Imię"
				name="firstName"
				value={values.firstName}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={isProcessing}
				error={Boolean(errors.firstName && touched.firstName)}
				helperText={Boolean(errors.firstName && touched.firstName) && errors.firstName}
			/>
			<TextField
				label="Nazwisko"
				name="lastName"
				value={values.lastName}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={isProcessing}
				error={Boolean(errors.lastName && touched.lastName)}
				helperText={Boolean(errors.lastName && touched.lastName) && errors.lastName}
			/>
			<TextField
				label="Data urodzenia"
				name="birthDate"
				value={values.birthDate}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={isProcessing}
				error={Boolean(errors.birthDate && touched.birthDate)}
				helperText={Boolean(errors.birthDate && touched.birthDate) && errors.birthDate}
				InputProps={{ inputComponent: BirthDateMaskCustom }}
			/>
			<TextField
				label="Numer telefonu"
				name="phone"
				value={values.phone}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={isProcessing}
				error={Boolean(errors.phone && touched.phone)}
				helperText={Boolean(errors.phone && touched.phone) && errors.phone}
				InputProps={{
					inputComponent: PhoneMaskCustom,
				}}
			/>
			<Button
				disabled={isFalseValue(isValid) || isValidating}
				onClick={submit}
				processing={isProcessing}
				type={'submit'}
				fullWidth
				color={'yellow'}>
				Zaktualizuj dane
			</Button>
		</Wrapper>
	);
};

export default SetPersonalData;
