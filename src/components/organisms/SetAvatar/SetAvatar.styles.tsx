import styled from 'styled-components';
import { MEDIA_WIDTH_MD } from '../../../assets/styles/utility';

export const Wrapper = styled.div`
	padding: 7% 0;
	display: grid;
	grid-template-rows: 275px 1fr;

	@media (max-width: ${MEDIA_WIDTH_MD}) {
		padding: 48px;
	}

	& > * {
		justify-self: center;
		width: 200px;
	}
`;
