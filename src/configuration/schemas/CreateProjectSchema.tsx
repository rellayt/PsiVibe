import * as Yup from 'yup';

export const CreateProjectSchema = Yup.object({
	title: Yup.string()
		.required('Tytuł jest wymagany')
		.min(4, 'Minimalna długość tytułu wynosi 3')
		.max(40, 'Maksymalna długość tytułu to 40'),
	description: Yup.string()
		.required('Opis jest wymagany')
		.min(16, 'Minimalna długość opisu wynosi 16')
		.max(512, 'Maksymalna długość opisu wynosi 512'),
});
