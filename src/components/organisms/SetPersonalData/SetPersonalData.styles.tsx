import styled from 'styled-components';
import { MEDIA_WIDTH_LG, MEDIA_WIDTH_MD } from '../../../assets/styles/utility';

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 50% 50%;
	grid-template-rows: repeat(2, 1fr) 100px;
	margin-top: 128px;
	padding: 0 10%;

	& > *:not(:last-child) {
		margin: 8px 20px;
	}

	div:nth-child(5) {
		grid-column: 2/3;
		padding: 8px 20px;
		align-self: center;
		@media (max-width: ${MEDIA_WIDTH_MD}) {
			grid-column: 1/2;
		}
	}

	@media (max-width: ${MEDIA_WIDTH_LG}) {
		padding: 0 5%;
	}

	@media (max-width: ${MEDIA_WIDTH_MD}) {
		grid-template-columns: 100%;
		grid-template-rows: repeat(4, 1fr) 100px;
		margin-top: 64px;

		& > * {
			grid-column: 1/2;
		}
	}
`;
