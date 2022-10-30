import * as Yup from 'yup';

export const AddressSchema = Yup.object({
	city: Yup.string().min(3, 'Minimalna długość nazwy miasta wynosi 3').max(40, 'Maksymalna długość nazwy miasta to 40'),
	country: Yup.string().min(4, 'Minimalna długość nazwy kraju wynosi 4').max(40, 'Maksymalna długość nazwy kraju to 40'),
});
