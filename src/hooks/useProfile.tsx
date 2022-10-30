import { useObservable } from '@mindspace-io/react';
import { Optional } from '../core/base/types/optional.type';
import { ProfileFacade, profileFacade as facade } from '../core/store/facades/profile.facade';
import { Nullable } from '../core/base/types/nullable.type';
import { Address, Avatar, PersonalData, Profile } from '../models/User.model';

export type ProfileHook = {
	address: Optional<Nullable<Address>>;
	personalData: Optional<Nullable<PersonalData>>;
	avatar: Optional<Avatar>;
	selectedProfile: Optional<Nullable<Profile>>;
	isAsyncError: Optional<boolean>;
	isProcessing: Optional<boolean>;
	facade: ProfileFacade;
};

export const useProfile = (): ProfileHook => {
	const [address] = useObservable<Nullable<Address>>(facade.address$);

	const [personalData] = useObservable<Nullable<PersonalData>>(facade.personalData$, null);

	const [avatar] = useObservable<Avatar>(facade.avatar$, { imagePath: undefined });

	const [selectedProfile] = useObservable<Nullable<Profile>>(facade.selectedProfile$, null);

	const [isProcessing] = useObservable<boolean>(facade.isProcessing$, false);

	const [isAsyncError] = useObservable<boolean>(facade.isError$, false);

	return { address, personalData, avatar, selectedProfile, isProcessing, isAsyncError, facade };
};
