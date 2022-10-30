/* eslint-disable react-hooks/exhaustive-deps */
import { EffectCallback, useEffect } from 'react';

export default function useEffectOnce(effectCallback: EffectCallback) {
	useEffect(effectCallback, []);
}
