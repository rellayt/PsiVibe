import { Backdrop } from '@mui/material';
import styled from 'styled-components';

export const StyledBackdrop = styled(Backdrop)`
  background: rgba(241, 241, 241, 0.4);
  filter: light(60%);
  animation-duration: 200ms;
  animation-name: backgroundAnimation;
  animation-direction: alternate-reverse;
  animation-iteration-count: infinite;
  display: flex;
  flex-direction: column;
  gap: 55px;

  @keyframes backgroundAnimation {
    33% {
      light(60%);
    }
    66% {
      light(30%);
    }
    100% {
      light(60%);
    }
  }
`;
