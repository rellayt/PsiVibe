import { Key } from '../../base/types/key.type';
import { EntityStore, QueryEntity } from '@datorama/akita';
import { RunnableFunction } from '../../base/types/runnable-function';
import { AsyncFunction } from '../../base/types/async-function';
import produce from 'immer';

export abstract class StoreManagement<S extends EntityStore<J, K>, V, Q extends QueryEntity<J, K>, K, J> {
	protected constructor(protected baseService: V, protected baseStore: S, protected baseQuery: Q) {}

	updateStateEntity<T>(entity: Key<K>, value: T): void {
		this.baseStore.update(
			produce((draft) => {
				draft[entity] = value;
			})
		);
	}

	protected async baseAsyncHandler(resolver: AsyncFunction, afterSuccessHandler?: RunnableFunction, afterErrorHandler?: RunnableFunction) {
		this.baseStore.setLoading(true);
		try {
			await resolver();
			this.baseStore.setLoading(false);
			afterSuccessHandler?.();
		} catch (error) {
			afterErrorHandler?.();
			this.baseStore.setLoading(false);
		}
	}

	protected setIsErrorState(isError: boolean): void {
		this.baseStore.setError(isError);
		this.baseStore.setLoading(false);
	}
}
