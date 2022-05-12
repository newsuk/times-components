import { Text } from "react-native";
import styled from "styled-components";
import {
  breakpoints,
  colours,
  fonts,
  fontSizes
} from "@times-components/ts-styleguide";

const PullQuoteContent = styled(Text)`
  color: ${colours.functional.primary};
  font-family: "${fonts.headlineRegular}";
  font-size: ${fontSizes.pageComponentHeadline}px;
  line-height: 30px;
  
  cite {
    font-style: normal;
  }

  @media (min-width: ${breakpoints.medium}px) {
    font-size: ${fontSizes.headline}px;
    line-height: 35px;
  }
`;

export default PullQuoteContent;
