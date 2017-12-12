import { View } from "react-native";
import styled from "styled-components";
import config from "./responsive-config";

export const MainContainer = styled(View)`
  @media (min-width: ${config.wideBreakpoint}) {
    padding: 15px 20px 0 0;
    margin: 0 auto;
  }
`;

/* --- Header --- */

export const HeaderContainer = styled(View)`
  ${config.articleContainerPadding} ${config.mediumBpPositioning} @media (min-width: ${config.wideBreakpoint}) {
    width: 100%;
    width: ${config.wideBpWidth};
  }
`;

/* --- Meta --- */

export const MetaContainer = styled(View)`
  @media (min-width: ${config.mediumBreakpoint}) {
    width: ${config.mediumBpWidth};
    margin: 0 auto;
  }

  @media (min-width: ${config.wideBreakpoint}) {
    margin-bottom: 20px;
    padding-right: 20px;
    padding-left: 20px;
    position: absolute;
    top: 0;
    width: 20.8333%;
  }
`;

/* --- Body --- */
export const BodyContainer = styled(View)`
  display: block;
`;
