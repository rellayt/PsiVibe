import useAsyncEffect from 'use-async-effect';

export default function useAsyncEffectOnce(effectCallback: () => Promise<void>) {
	useAsyncEffect(effectCallback, []);
}
