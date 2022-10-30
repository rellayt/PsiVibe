import styled from 'styled-components';
import { EASE_OUT_BACK, selectBackground, selectColor, selectFontSize } from '../../../assets/styles/utility';
import { MenuItem as MuiMenuItem } from '@mui/material';

export const Wrapper = styled.div`
  .MuiButton-root {
    background: transparent;
    font-weight: 600;
    ${selectFontSize('s')};
    ${selectColor('black')};
    padding: 2px 12px;
    border-radius: 4px;
    transition: transform 250ms ${EASE_OUT_BACK};

    .MuiButton-startIcon > *:nth-of-type(1) {
      ${selectFontSize('l')} !important;
    }

    &:hover {
      transform: scale(0.98);
    }
 
    .MuiSvgIcon-root {
      width: 1.2em;
      height: 1.2em;
    }
  }


  .MuiPaper-root {
    box-shadow: 0 3px 25px -10px ${({ theme: { colors } }) => colors.gray}, inset 0 0px 4px -4px ${({ theme: { colors } }) => colors.gray};
    position: relative;
    top: 5px;
    left: 7px;
		border: solid 1px rgb(0 0 0 / 8%);
  }

  .MuiMenuItem-root {
    padding: 10px 38px !important;
    border-radius: 12px !important;
    justify-content: center !important;
  }
}
`;

export const MenuItem = styled(MuiMenuItem)<{ isActive?: boolean }>`
	${({ isActive }) => selectBackground(isActive ? 'gray' : 'white')};
	pointer-events: ${({ isActive }) => (isActive ? 'none' : 'default')};
	transition: background 300ms ease;
	border-radius: 12px;
`;
