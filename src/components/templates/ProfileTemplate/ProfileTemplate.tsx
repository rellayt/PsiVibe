import React, { ReactElement } from 'react';
import { NameEmailAvatarWrapper, Wrapper } from './ProfileTemplate.styles';
import { Address, Avatar as AvatarModel, PersonalData, User } from '../../../models/User.model';
import { DataWrapper, Date, Email, Field, Header, Name } from './ProfileTemplate.styles';
import { isToday } from '../../../helpers/is-today';
import Moment from 'react-moment';
import { Nullable } from '../../../core/base/types/nullable.type';
import { Avatar as DefaultAvatar } from '@mui/material';
import Avatar from '../../atoms/Avatar/Avatar';

interface ProfileTemplateProps {
	user?: Nullable<User>;
	address?: Nullable<Address>;
	personalData?: Nullable<PersonalData>;
	avatar?: Nullable<AvatarModel>;
}

const ProfileTemplate = ({ user, address, personalData, avatar }: ProfileTemplateProps): ReactElement => {
	const isEmpty = (object: Address | PersonalData) => Object.values(object).every((value) => value === null || value === '');

	return (
		<>
			{user && (
				<Wrapper>
					<NameEmailAvatarWrapper>
						{avatar?.imagePath ? <Avatar path={avatar.imagePath} /> : <DefaultAvatar sx={{ width: 75, height: 75 }} />}
						<Name>{user.username}</Name>
						<Email>{user.email}</Email>
					</NameEmailAvatarWrapper>
					<Date>
						Utworzono
						<div>
							{isToday(user.createdAt) && 'dzisiaj o '}
							<Moment format={isToday(user.createdAt) ? 'HH:mm' : 'DD/MM/YY HH:mm'}>{user.createdAt}</Moment>
						</div>
					</Date>
					{user.createdAt !== user.updatedAt && (
						<Date>
							Zaktualizowano
							<div>
								{isToday(user.updatedAt) && 'dzisiaj o '}
								<Moment format={isToday(user.updatedAt) ? 'HH:mm' : 'DD/MM/YY HH:mm'}>{user.updatedAt}</Moment>
							</div>
						</Date>
					)}
					{address && !isEmpty(address) && (
						<DataWrapper>
							<Header>Adres</Header>
							{address.country && <Field>Kraj: {address.country}</Field>}
							{address.state && <Field>Województwo: {address.state}</Field>}
							{address.city && <Field>Miasto: {address.city}</Field>}
						</DataWrapper>
					)}
					{personalData && !isEmpty(personalData) && (
						<DataWrapper>
							<Header>Dane personalne</Header>
							{personalData.firstName && <Field>Imię: {personalData.firstName}</Field>}
							{personalData.lastName && <Field>Nazwisko: {personalData.lastName}</Field>}
							{personalData.birthDate && (
								<Field>
									Data urodzenia: <Moment format={'DD/MM/YY'}>{personalData.birthDate}</Moment>
								</Field>
							)}
							{personalData.phone && <Field>Telefon: {personalData.phone}</Field>}
						</DataWrapper>
					)}
				</Wrapper>
			)}
		</>
	);
};

export default ProfileTemplate;
