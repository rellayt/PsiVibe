import { isNotUndefined } from './isNotUndefined';

export const isNotNil = <T extends unknown>(value: T) => isNotUndefined(value) && value !== null;
