import { View } from "react-native";
import styled from "styled-components";

const mediumBreakpoint = "768px";

const ImageWrapper = styled(View)`
  @media (min-width: ${mediumBreakpoint}) {
    padding: 0px 10px;
  }
`;

export default ImageWrapper;
