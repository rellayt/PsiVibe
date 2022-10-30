import styled from 'styled-components';
import { flexColAlignAndJustifyCenter, MEDIA_WIDTH_MD } from '../../../assets/styles/utility';

export const Wrapper = styled.div`
	${flexColAlignAndJustifyCenter};
	width: 400px;
	gap: 24px;
	margin: 100px auto;

	& > * {
		width: 100%;
	}

	@media (max-width: ${MEDIA_WIDTH_MD}) {
		width: 100%;
		padding: 0 48px;
	}
`;
