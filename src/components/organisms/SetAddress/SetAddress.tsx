import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Wrapper } from './SetAddress.styles';
import { TextField } from '../../atoms/TextField/TextField';
import Select from '../../atoms/Select/Select';
import { STATES } from '../../../configuration/constans/states';
import { Address, PersonalData } from '../../../models/User.model';
import { useProfile } from '../../../hooks/useProfile';
import { snackbarContext } from '../../../core/providers/Snackbar.provider';
import { openSnackbar } from '../../../core/store/actions/snackbar.actions';
import { useFormik } from 'formik';
import Button from '../../atoms/Button/Button';
import { isFalseValue } from '../../../core/base/utility/isFalseValue';
import { AddressSchema } from '../../../configuration/schemas/AddressSchema';
import { ProfileSegment } from '../../../core/store/facades/profile.facade';
import { SnackbarMessage } from '../../../configuration/constans/snackbar-message';

const ADDRESS_INITIAL_VALUES: Address = {
	city: '',
	state: '',
	country: 'Polska',
};

const SetAddress = (): ReactElement => {
	const { address, isProcessing, facade } = useProfile();

	const { snackbarDispatch } = useContext(snackbarContext);

	const [addressInitialState, setAddressInitialState] = useState<PersonalData>(ADDRESS_INITIAL_VALUES);

	useEffect(() => {
		if (address) {
			const addressWithoutNullValues = Object.fromEntries(Object.entries(address).filter(([_, v]) => v != null));
			setAddressInitialState({ ...ADDRESS_INITIAL_VALUES, ...addressWithoutNullValues });
		}
	}, [address]);

	const afterSuccessHandler = () => {
		openSnackbar(snackbarDispatch, SnackbarMessage.UPDATE_ADDRESS_SUCCESS);
	};

	const afterErrorHandler = () => {
		openSnackbar(snackbarDispatch, SnackbarMessage.STANDARD_ERROR);
	};

	const capitalizeFirstLetter = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

	const {
		values,
		handleBlur,
		touched,
		errors,
		isValidating,
		handleChange,
		handleSubmit: submit,
		isValid,
	} = useFormik<Address>({
		initialValues: addressInitialState,
		validateOnChange: false,
		validationSchema: AddressSchema,
		enableReinitialize: true,
		onSubmit: async (values) => {
			const address = {
				...values,
				country: capitalizeFirstLetter(values.country as string),
				city: capitalizeFirstLetter(values.city as string),
			};
			await facade.updateProfile(address, ProfileSegment.ADDRESS, afterSuccessHandler, afterErrorHandler);
		},
	});

	return (
		<Wrapper>
			<TextField
				label="Miasto"
				name="city"
				value={values.city}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={isProcessing}
				error={Boolean(errors.city && touched.city)}
				helperText={Boolean(errors.city && touched.city) && errors.city}
			/>
			<Select label={'Województwo'} name="state" value={values.state} onChange={handleChange} disabled={isProcessing} options={STATES} />
			<TextField
				label="Kraj"
				name="country"
				value={values.country}
				onChange={handleChange}
				onBlur={handleBlur}
				disabled={isProcessing}
				error={Boolean(errors.country && touched.country)}
				helperText={Boolean(errors.country && touched.country) && errors.country}
			/>
			<Button
				disabled={isFalseValue(isValid) || isValidating}
				onClick={submit}
				processing={isProcessing}
				type={'submit'}
				fullWidth
				color={'yellow'}>
				Zaktualizuj adres
			</Button>
		</Wrapper>
	);
};

export default SetAddress;
