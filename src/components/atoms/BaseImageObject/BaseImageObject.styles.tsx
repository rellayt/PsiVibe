import styled from 'styled-components';
import { MEDIA_WIDTH_LG, MEDIA_WIDTH_MD, MEDIA_WIDTH_SM, MEDIA_WIDTH_XLG } from '../../../assets/styles/utility';

export interface BaseImageObjectStyledProps {
	width?: number;
}

export const Wrapper = styled.div<BaseImageObjectStyledProps>`
	display: flex;
	z-index: 2;
	position: relative;
	img {
		height: 100%;
		width: 1000px;

		@media (max-width: ${MEDIA_WIDTH_XLG}) {
			translate: translateY(45px);
			width: 880px;
		}

		@media (max-width: ${MEDIA_WIDTH_LG}) {
			width: 810px;
		}

		@media (max-width: ${MEDIA_WIDTH_MD}) {
			width: 690px;
		}

		@media (max-width: ${MEDIA_WIDTH_SM}) {
			width: 410px;
		}
	}
`;
