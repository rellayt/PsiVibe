import { FormikTouched } from 'formik';

export const isEveryElementTouched = (value: FormikTouched<unknown>) => {
	return Object.keys(value).length === 0 && value.constructor === Object;
};
