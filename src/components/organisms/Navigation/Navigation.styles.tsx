import styled from 'styled-components';
import { flexAlignCenter, MEDIA_WIDTH_LG } from 'assets/styles/utility';

export const Wrapper = styled.div`
	padding: 24px 48px;
	height: 130px;
	${flexAlignCenter};
	height: ${({ theme: { navbarHeight } }) => navbarHeight};
	justify-content: space-between;
	animation-fill-mode: forwards;
	animation-duration: 700ms;
	animation-name: init;

	@media (max-width: ${MEDIA_WIDTH_LG}) {
		padding: 12px 36px;
	}
`;
