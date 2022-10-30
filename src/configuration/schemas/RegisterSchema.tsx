import * as Yup from 'yup';
import { authService } from '../../core/store/services/auth.service';
import { asNonUndefined } from '../../core/base/utility/asNonUndefined';

const namePattern = /^[a-zA-Z0-9_.-]*$/;

let cachedNameValidation = { name: '', availability: false },
	cachedEmailValidation = { email: '', availability: false };

const EMAIL_ASYNC_ERROR_MSG = 'Email jest zajęty';

const NAME_ASYNC_ERROR_MSG = 'Nazwa jest zajęta';

export const RegisterSchema = Yup.object({
	username: Yup.string()
		.required('Nazwa jest wymagana')
		.min(3, 'Minimalna długość nazwy wynosi 3')
		.matches(namePattern, 'Nazwa jest nieprawidłowa')
		.test('CheckNameAvailability', NAME_ASYNC_ERROR_MSG, async (name): Promise<boolean> => {
			if (name === cachedNameValidation.name) return cachedNameValidation.availability;
			try {
				await authService.checkName(asNonUndefined(name));
				cachedNameValidation = { name: asNonUndefined(name), availability: true };
				return true;
			} catch (error) {
				return false;
			}
		}),
	email: Yup.string()
		.required('Email jest wymagany')
		.min(5, 'Minimalna ilość znaków wynosi 5')
		.email('Nieprawidłowy adres email')
		.test('email_async_validation', EMAIL_ASYNC_ERROR_MSG, async (email): Promise<boolean> => {
			if (email === cachedEmailValidation.email) return cachedEmailValidation.availability;
			try {
				await authService.checkEmail(asNonUndefined(email));
				cachedEmailValidation = { email: asNonUndefined(email), availability: true };
				return true;
			} catch (error) {
				return false;
			}
		}),
	password: Yup.string().required('Hasło jest wymagane').min(5, 'Minimalna długość hasła wynosi 5'),
	roles: Yup.string().required('Rola jest wymagana'),
});
