import { ReactElement, SyntheticEvent, useContext } from 'react';
import { Wrapper } from './SetAvatar.styles';
import { Avatar as DefaultAvatar, IconButton, Skeleton } from '@mui/material';
import Button from '../../atoms/Button/Button';
import { openSnackbar } from '../../../core/store/actions/snackbar.actions';
import { SnackbarMessage } from '../../../configuration/constans/snackbar-message';
import { snackbarContext } from '../../../core/providers/Snackbar.provider';
import { useProfile } from '../../../hooks/useProfile';
import Avatar from '../../atoms/Avatar/Avatar';
import { Wrapper as AvatarWrapper } from '../../atoms/Avatar/Avatar.styles';
import { isUndefined } from '../../../core/base/utility/isUndefined';
import { isFalseValue } from '../../../core/base/utility/isFalseValue';

const SetAvatar = (): ReactElement => {
	const { snackbarDispatch } = useContext(snackbarContext);

	const { avatar, isProcessing, facade } = useProfile();

	const handleFileSelected = async (e: any) => {
		const file = e.target.files[0];
		if (isUndefined(file)) return;

		const isAllowedFileType = file.type === 'image/png' || file.type === 'image/jpeg';
		if (isFalseValue(isAllowedFileType)) {
			afterErrorHandler();
			return;
		}
		await facade.uploadAvatar(file, afterSuccessHandler, afterErrorHandler);
	};

	const afterSuccessHandler = () => openSnackbar(snackbarDispatch, { ...SnackbarMessage.UPLOAD_AVATAR_SUCCESS, duration: 2000 });

	const afterErrorHandler = () => openSnackbar(snackbarDispatch, SnackbarMessage.UPLOAD_AVATAR_ERROR);

	return (
		<Wrapper>
			<AvatarWrapper>
				{!isProcessing ? (
					avatar?.imagePath ? (
						<Avatar path={avatar.imagePath} width={200} height={200} />
					) : (
						<DefaultAvatar sx={{ width: 200, height: 200 }} />
					)
				) : (
					<Skeleton variant="circular" animation="pulse" width={200} height={200} />
				)}
			</AvatarWrapper>
			<label htmlFor="upload-image">
				<input style={{ display: 'none' }} id="upload-image" name="upload-photo" type="file" onChange={handleFileSelected} />
				<Button component="span" processing={isProcessing} fullWidth>
					Zmień zdjęcie
				</Button>
			</label>
		</Wrapper>
	);
};

export default SetAvatar;
