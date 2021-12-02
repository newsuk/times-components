import { View } from "react-native";
import styled, { keyframes } from "styled-components";

const fadingAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const FadeIn = styled(View)`
  animation: ${fadingAnimation} 0.3s ease-in-out;
`;

export default FadeIn;
