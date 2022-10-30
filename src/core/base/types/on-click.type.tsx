import React, { MouseEventHandler } from 'react';
type FormEventHandler = (e?: React.FormEvent<HTMLFormElement> | undefined) => void;

type PromiseFnType = (message: string) => Promise<void>

export type OnClick = MouseEventHandler | FormEventHandler | PromiseFnType;
