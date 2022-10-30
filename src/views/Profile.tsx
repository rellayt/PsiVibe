import React from 'react';
import FeatureBaseTemplate from '../components/templates/FeatureBaseTemplate/FeatureBaseTemplate';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import ProfileTemplate from '../components/templates/ProfileTemplate/ProfileTemplate';

const Profile = () => {
	const { user } = useAuth();

	const { address, personalData, avatar } = useProfile();

	return (
		<FeatureBaseTemplate headerContent={'Mój profil'}>
			<ProfileTemplate user={user} address={address} personalData={personalData} avatar={avatar} />
		</FeatureBaseTemplate>
	);
};

export default Profile;
