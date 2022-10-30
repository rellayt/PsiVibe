import { KeyValue } from '../../core/base/types/key-value.type';

export enum ROLE {
	MAKER = 'ROLE_CLIENT_MAKER',
	AUTHOR = 'ROLE_CLIENT_AUTHOR',
}

export const ROLES: KeyValue[] = [
	{
		key: ROLE.MAKER,
		value: 'Wykonawca',
	},
	{
		key: ROLE.AUTHOR,
		value: 'Zleceniodawca',
	},
];
