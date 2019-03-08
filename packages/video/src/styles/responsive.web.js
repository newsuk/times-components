import { Text, View } from "react-native";
import styled from "styled-components";
import { breakpoints, fontSizes } from "@times-components/styleguide";

const SkySportsTextContainer = styled(Text)`
  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.caption}px;
  }
`;

const Video360Container = styled(View)`
  border-radius: 100%;
  left: 50%;
  position: absolute;
  height: 100px;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  z-index: 1;
  pointer-events: none;

  [data-is-360="true"]:hover & {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export { SkySportsTextContainer, Video360Container };
