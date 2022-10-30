import styled from 'styled-components';
import { flexSpaceBetween, selectBackground, selectFontSize } from '../assets/styles/utility';
import { Pagination } from '@mui/material';

const headerHeight = '70px';
const paginationSectionHeight = '90px';

export const Wrapper = styled.div`
	display: grid;
	grid-template-rows: ${headerHeight} calc(100% - ${headerHeight} - ${paginationSectionHeight}) ${paginationSectionHeight};
`;

export const Header = styled.div`
	grid-row: 1/2;
	${flexSpaceBetween};
	${selectFontSize('xl')};
	font-weight: 600;

	div:nth-child(2) {
		z-index: 10;
	}
`;

export const StyledPagination = styled(Pagination)`
	align-self: center;
	margin: 0 auto;
	ul li button {
		${selectBackground('white')} !important;
		${selectFontSize('xm')}
		box-shadow: inset 0 0 8px -6px ${({ theme: { colors } }) => colors.lightGray};
		border: solid 1px rgb(0 0 0 / 8%) !important;
		padding: 20px;
	}
`;
