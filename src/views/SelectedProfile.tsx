import React, { ReactElement } from 'react';
import FeatureBaseTemplate from '../components/templates/FeatureBaseTemplate/FeatureBaseTemplate';
import ProfileTemplate from '../components/templates/ProfileTemplate/ProfileTemplate';
import { useProfile } from '../hooks/useProfile';
import { useParams } from 'react-router-dom';
import useAsyncEffectOnce from '../helpers/use-async-effect-once';
import { isUndefined } from '../core/base/utility/isUndefined';
import { firstElement } from '../core/base/utility/firstElement';
import { ROLE } from '../configuration/constans/roles';
import useEffectOnce from '../helpers/use-effect-once';

const SelectedProfile = (): ReactElement => {
	const { selectedProfile, facade } = useProfile();

	const { id }: { id: string } = useParams();

	useAsyncEffectOnce(async () => {
		if (isUndefined(id)) return;

		facade.findProfile(id).then();
	});

	useEffectOnce(() => () => facade.resetSelectedProfile());

	return (
		<>
			{selectedProfile && (
				<FeatureBaseTemplate
					headerContent={firstElement(selectedProfile.user.roles) === ROLE.AUTHOR ? 'Profil zleceniodawcy' : 'Profil wykonawcy'}>
					<ProfileTemplate
						user={selectedProfile.user}
						address={selectedProfile.address}
						personalData={selectedProfile.personalData}
						avatar={selectedProfile.avatar}
					/>
				</FeatureBaseTemplate>
			)}
		</>
	);
};

export default SelectedProfile;
