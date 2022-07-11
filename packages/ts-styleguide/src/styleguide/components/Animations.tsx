import TsTcView from './TsTcView';
import styled, { keyframes } from 'styled-components';

const fadingAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const FadeIn = styled(TsTcView)`
  animation: ${fadingAnimation} 0.3s ease-in-out;
`;

const Animations = {
  FadeIn
};

export default Animations;
