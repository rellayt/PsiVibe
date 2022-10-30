import { isNotUndefined } from './isNotUndefined';
import { Optional } from '../types/optional.type';

export const isTrueValue = <T extends boolean>(value: Optional<T>) => isNotUndefined(value) && value === true;
