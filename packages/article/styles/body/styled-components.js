import { View } from "react-native";
import styled from "styled-components";

const mediumBreakpoint = "768px";

const ParagraphWrapper = styled(View)`
  @media (min-width: ${mediumBreakpoint}) {
    width: 83.333333333333%;
    margin: 0 auto;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export default ParagraphWrapper;
