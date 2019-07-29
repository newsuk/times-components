import React from "react";
import {
  responsiveStyled,
  mediaQuery
} from "./src/responsive-styled-components-native";

const Box = responsiveStyled.View`
  width: 80px;
  height: 80px;
  background-color: red;
  
  ${mediaQuery.maxWidth.medium`
    background-color: blue; 
  `} 
   
  ${mediaQuery.minWidth.huge`
    width: 100%; 
  `}
`;

export default {
  children: [
    {
      component: () => <Box />,
      name: "Default",
      type: "story"
    }
  ],
  name: "Helpers/ResponsiveStyledComponentsNative"
};
