import { createGlobalStyle } from 'styled-components';
import { flexColAlignStartAndJustifyCenter, selectBackground, selectFontSize } from './utility';

export const GlobalStyle = createGlobalStyle`

  html, body {
    margin: 0;
    padding: 0;
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }

  body {
    height: 100%;
    width: 100%;
    font-family: 'Source Sans Pro', sans-serif;
    ${selectFontSize('m')};
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a, button {
    ${selectFontSize('l')};
  }

  .MuiList-root {
    ${flexColAlignStartAndJustifyCenter};
    gap: 8px;

    * > & {
      margin: 4px 8px;
    }
  }

  .MuiPaper-root {
    ${selectBackground('white')};
  }

  .MuiPaper-root:before {
    ${selectBackground('white')} !important;
  }

  .MuiMenuItem-root {
    width: 100%;
    display: flex !important;

    & > * {
      //justify-content: center !important;
      align-self: center;
    }

    div:first-child {
      justify-self: flex-start;
    }

    padding: 12px !important;
    border-radius: 8px !important;
    ${selectFontSize('xm')};
  }

  .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root.Mui-selected {
    ${selectBackground('blueLowOpacity')} !important;
  }

  // .MuiSkeleton-text {
  // transform: scale(1, 0.8);
  // transition: opacity; 
  // }
  // .MuiMenuItem-root {
  //   font-size: ${({ theme: { fontSizes } }) => fontSizes.l};
  // }

`;
