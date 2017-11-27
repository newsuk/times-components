import { View } from "react-native";
import styled from "styled-components";

const wideBreakpoint = "1024px";

export const ImageWrapper = styled(View)`
// background-color: pink;
  @media (min-width: ${wideBreakpoint}) {
    //background-color: lightgreen;

  }
`;
export const ArticleMetaContainer = styled(View)`
  margin-bottom: 20px;
  border-bottom-color: "#d0cece";
  border-bottom-width: 1px;
`;

export const ArticleMetaElement = styled(View)`
  border-top-color: "#d0cece";
  border-top-width: 1px;
  padding-top: 9px;
  padding-bottom: 5px;
`;

//  Added ArticleMainContentRow style in this
export const ArticleMiddleContainer = styled(View)`
  padding-top: 9px ;
  padding-left: 10px;
  padding-right: 10px;
`;

// export const ArticleMainContentRow = styled(View)`
//   padding-left: 10;
//   padding-right: 10;
// `;
