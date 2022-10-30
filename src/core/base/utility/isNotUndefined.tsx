import { isUndefined } from './isUndefined';

export const isNotUndefined = <T,>(value: T) => !isUndefined(value);
