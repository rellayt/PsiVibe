import { Dispatch } from 'react';

export type DispatchWithType<T = unknown> =Dispatch<{ type: string } & T>;
