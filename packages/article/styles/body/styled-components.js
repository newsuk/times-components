import { View } from "react-native";
import styled from "styled-components";

const mediumBreakpoint = "768px";

const ImageWrapper = styled(View)`
// background-color: pink;
  @media (min-width: ${mediumBreakpoint}) {
    //background-color: lightgreen;

  }
`;

export default ImageWrapper;
