import { Optional } from 'core/base/types/optional.type';
import { isUndefined } from './isUndefined';

export const asNonUndefined = <T extends unknown>(value: Optional<T>) => {
	if (isUndefined(value)) {
		throw new Error('Value is undefined');
	}
	return value as T;
};
