import * as Yup from 'yup';

export const LoginSchema = Yup.object({
	username: Yup.string().required('Nazwa jest wymagana').min(3, 'Minimalna długość nazwy wynosi 3'),
	password: Yup.string().required('Hasło jest wymagane').min(5, 'Minimalna długość hasła wynosi 5'),
});
