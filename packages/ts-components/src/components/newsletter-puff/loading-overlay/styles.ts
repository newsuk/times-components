import styled from 'styled-components';

import { breakpoints } from '@times-components/ts-styleguide';

import { View } from '../styles';

export const Overlay = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1;
`;

export const Bubble = styled.div`
  animation: expand 0.75s ease-in-out infinite;
  border-radius: 20px;
  display: inline-block;
  transform-origin: center center;
  margin: 0 7px;
  width: 16px;
  height: 16px;
  background: #c4c4c4;

  :nth-child(2) {
    animation-delay: 250ms;
  }

  :nth-child(3) {
    animation-delay: 500ms;
  }

  @keyframes expand {
    100% {
      background: #6b6b6b;
    }
  }
`;

export const Loader = styled(View)`
  display: flex;
  flex-direction: row;
  left: 40%;
  top: 45%;

  @media (min-width: ${breakpoints.wide}px) {
    left: 40%;
    top: 28%;
  }
`;
