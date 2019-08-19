import responsiveStyled, {
  mediaQuery
} from "@times-components/responsive-styled-components-native";
import { spacing } from "@times-components/styleguide";

export const KeyFactsResponsiveContainer = responsiveStyled.View`
  margin: 5px 10px;

  ${mediaQuery.minWidth.medium`
    flex-direction: row;
    margin: 10px auto;
    width: 80.8%;
  `};

  ${mediaQuery.minWidth.wide`
    width: 56.2%;
  `};
`;

export const KeyFactsResponsiveWrapper = responsiveStyled.View`
  ${mediaQuery.minWidth.medium`
    width: 80%;
  `}
`;

export const KeyFactsTitleResponsive = responsiveStyled.Text`
  ${mediaQuery.minWidth.medium`
    padding-right: ${spacing(4)};
    width: 20%;
  `}
`;
