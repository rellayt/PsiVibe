import * as Yup from 'yup';

export const SetPasswordSchema = Yup.object({
	oldPassword: Yup.string().required('Hasło jest wymagane').min(5, 'Minimalna długość hasła wynosi 5'),
	newPassword: Yup.string().required('Nowe hasło jest wymagane').min(5, 'Minimalna długość hasła wynosi 5'),
	newPasswordConfirm: Yup.string()
		.required('Powtórzenie hasła jest wymagane')
		.min(5, 'Minimalna długość hasła wynosi 5')
		.oneOf([Yup.ref('newPassword'), null], 'Hasła muszą być takie same'),
});
