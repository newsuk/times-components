import React from "react";
import responsiveStyled, {
  mediaQuery,
  css
} from "./src/responsive-styled-components-native";

const Box = responsiveStyled.View`
  width: 80px;
  height: 80px;
  background-color: red;
  margin-bottom: 40px;
  
  ${mediaQuery.maxWidth.medium`
    background-color: blue;
    
    ${props =>
      props.big &&
      css`
        height: 200px;
      `};
  `};
   
  ${mediaQuery.minWidth.huge`
    width: 100%; 
  `};
`;

export default {
  children: [
    {
      component: () => (
        <>
          <Box />
          <Box big />
        </>
      ),
      name: "Default",
      type: "story"
    }
  ],
  name: "Helpers/ResponsiveStyledComponentsNative"
};
