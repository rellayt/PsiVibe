import { EntityStore, StoreConfig } from '@datorama/akita';
import { QueryEntity } from '@datorama/akita';
import { ProfileEntityState, ProfileState } from '../models/Profile.model';

export const PROFILE_INITIAL_STATE: ProfileState = { address: null, personalData: null, avatar: null, selectedProfile: null };

@StoreConfig({ name: 'Profile' })
export class ProfileStore extends EntityStore<ProfileEntityState, ProfileState> {
	constructor() {
		super(PROFILE_INITIAL_STATE);
	}
}

export class ProfileQuery extends QueryEntity<ProfileEntityState, ProfileState> {
	address$ = this.select(({ address }) => address);

	personalData$ = this.select(({ personalData }) => personalData);

	avatar$ = this.select(({ avatar }) => avatar);

	selectedProfile$ = this.select(({ selectedProfile }) => selectedProfile);

	isProcessing$ = this.selectLoading();

	isError$ = this.selectError();

	constructor(protected store: ProfileStore) {
		super(store);
		store.setLoading(false);
	}
}

export const profileStore = new ProfileStore();

export const profileQuery = new ProfileQuery(profileStore);
