import * as Yup from 'yup';
import { Optional } from '../../core/base/types/optional.type';
import { isUndefined } from '../../core/base/utility/isUndefined';

export const PersonalDataSchema = Yup.object({
	firstName: Yup.string().min(3, 'Minimalna długość imienia wynosi 3').max(20, 'Maksymalna długość imienia wynosi 20'),
	lastName: Yup.string().min(3, 'Minimalna długość imienia wynosi 3').max(20, 'Maksymalna długość imienia wynosi 20'),
	phone: Yup.string().length(17, 'Numer telefonu jest zbyt krótki'),
	birthDate: Yup.string().test('DateValidation', 'Błędna data', (value: Optional<string>): boolean => {
		if (isUndefined(value)) return true;

		const date = new Date(value as string);
		if (!date.getTime()) return false;

		const from2015Date = new Date(new Date().setFullYear(2015));
		return date.getTime() < from2015Date.getTime();
	}),
});
