import { View } from "react-native";
import withResponsiveStyles from "@times-components/responsive-styles";
import { keyframes } from "styled-components";

const fadingAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const FadeIn = withResponsiveStyles(View, {
  base: () => `
    animation: ${fadingAnimation} 0.3s ease-in-out;
  `
});
FadeIn.displayName = "FadeIn";

export default FadeIn;
