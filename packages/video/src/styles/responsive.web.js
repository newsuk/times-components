import { Text } from "react-native";
import styled from "styled-components";
import { breakpoints, fontSizes } from "@times-components/styleguide";

const SkySportsTextContainer = styled(Text)`
  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.caption}px;
  }
`;

export default SkySportsTextContainer;
