import { EntityState } from '@datorama/akita';
import { Address, Avatar, PersonalData, Profile } from '../../../models/User.model';
import { Nullable } from '../../base/types/nullable.type';

export interface ProfileState {
	personalData: Nullable<PersonalData>;
	address: Nullable<Address>;
	avatar: Nullable<Avatar>;
	selectedProfile: Nullable<Profile>;
}

export interface ProfileEntityState extends EntityState<ProfileState> {}
