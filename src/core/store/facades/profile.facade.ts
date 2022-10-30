import { StoreManagement } from './store-management.abstract';
import { RunnableFunction } from '../../base/types/runnable-function';
import { PROFILE_INITIAL_STATE, ProfileQuery, profileQuery, ProfileStore, profileStore } from '../state/profile.store';
import { ProfileData, ProfileResponseData, ProfileService, profileService } from '../services/profile.service';
import { ProfileEntityState, ProfileState } from '../models/Profile.model';
import { SetPasswordData } from '../../../components/organisms/SetPassword/SetPassword';
import { Address, ADDRESS_KEYS, PERSONAL_DATA_KEYS, PersonalData, User } from '../../../models/User.model';
import { AuthFacade } from './auth.facade';
import { authService, AuthService, UserResponseData } from '../services/auth.service';
import { isNil } from '@datorama/akita';

export enum ProfileSegment {
	ADDRESS = 'Address',
	PERSONAL_DATA = 'PersonalData',
}

export class ProfileFacade extends StoreManagement<ProfileStore, ProfileService, ProfileQuery, ProfileState, ProfileEntityState> {
	readonly personalData$ = this.baseQuery.personalData$;

	readonly address$ = this.baseQuery.address$;

	readonly avatar$ = this.baseQuery.avatar$;

	readonly isProcessing$ = this.baseQuery.isProcessing$;

	readonly selectedProfile$ = this.baseQuery.selectedProfile$;

	readonly isError$ = this.baseQuery.isError$;

	constructor(
		protected profileService: ProfileService,
		protected profileStore: ProfileStore,
		protected profileQuery: ProfileQuery,
		private authService: AuthService
	) {
		super(profileService, profileStore, profileQuery);
	}

	async changePassword(passwordData: SetPasswordData, afterSuccessHandler: RunnableFunction, afterErrorHandler: RunnableFunction) {
		const doAfterErrorHandler = () => {
			afterErrorHandler();
			this.baseStore.setError(true);
		};
		await this.baseAsyncHandler(async () => await this.baseService.changePassword(passwordData), afterSuccessHandler, doAfterErrorHandler);
	}

	resetAsyncError(): void {
		this.setIsErrorState(false);
	}

	async updateProfile(
		profileData: ProfileData,
		profileSegmentKey: ProfileSegment,
		afterSuccessHandler: RunnableFunction,
		afterErrorHandler: RunnableFunction
	) {
		await this.baseAsyncHandler(
			async () => {
				const { data }: ProfileResponseData = await this.baseService.updateProfile(profileData);

				const parsedData = this.parseToProfileSegment(data, profileSegmentKey);

				if (ProfileFacade.isAddressSegment(profileSegmentKey)) {
					this.updateStateEntity<Address>('address', parsedData);
				} else {
					this.updateStateEntity<PersonalData>('personalData', parsedData);
				}
			},
			afterSuccessHandler,
			afterErrorHandler
		);
	}

	async findProfile(id: string) {
		await this.baseAsyncHandler(async () => {
			const { data }: UserResponseData = await this.baseService.findProfile(id);

			const user = AuthFacade.parseUser(data);
			const personalData = this.parseToProfileSegment(data, ProfileSegment.PERSONAL_DATA);
			const address = this.parseToProfileSegment(data, ProfileSegment.ADDRESS);
			const avatar = { imagePath: user.image };

			this.updateStateEntity('selectedProfile', { user, personalData, address, avatar });
		});
	}

	resetSelectedProfile(): void {
		this.updateStateEntity('selectedProfile', null);
	}

	async uploadAvatar(file: File, afterSuccessHandler: RunnableFunction, afterErrorHandler: RunnableFunction) {
		await this.baseAsyncHandler(
			async () => {
				await this.profileService.uploadAvatar(file);

				const { data: user } = await this.authService.currentUser();

				this.saveAvatar(user);
			},
			afterSuccessHandler,
			afterErrorHandler
		);
	}

	private static isAddressSegment(profileSegment: ProfileSegment): boolean {
		return profileSegment === ProfileSegment.ADDRESS;
	}

	saveAvatar({ image }: User): void {
		if (isNil(image)) {
			return;
		}
		this.updateStateEntity('avatar', { imagePath: image });
	}

	parseToProfileSegment(profileData: ProfileData, profileSegment: ProfileSegment) {
		const profileSegmentKeys = ProfileFacade.isAddressSegment(profileSegment) ? ADDRESS_KEYS : PERSONAL_DATA_KEYS;
		const object = {};
		profileSegmentKeys.forEach((key) => {
			// @ts-ignore
			object[key] = profileData[key];
		});
		return object;
	}

	resetProfile() {
		this.baseStore.update({ ...PROFILE_INITIAL_STATE });
	}
}

// // @todo - this should be part of a formal DI system
export const profileFacade = new ProfileFacade(profileService, profileStore, profileQuery, authService);
