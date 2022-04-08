import React from "react";
import styled,  { Interpolation } from "styled-components";
// not sure how else to put the default styles, this the default style for a React Native <Text/> component



const TcText = styled.div`
  border: 0px solid black;
  box-sizing: border-box;
  color: ${props => props.style && props.style.color ? props.style.color : 'rgb(0, 0, 0)'};
  display: inline;
  font: 14px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
  margin: 0px;
  padding: 0px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: ${props => props.style && props.style.fontSize ? props.style.fontSize : '14px'};
  font-weight: ${props => props.style && props.style.fontWeight && props.style.fontWeight};
  margin-bottom: ${props => props.style && props.style.marginBottom ? props.style.marginBottom : '0px'};
  margin-left: ${props => props.style && props.style.marginLeft ? props.style.marginLeft : '0px'};
  margin-top: ${props => props.style && props.style.marginTop ? props.style.marginTop : '0px'};
  font-family: ${props => props.style && props.style.fontFamily ? props.style.fontFamily : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif'};
`;

export default TcText;
// ${({ style }) => style.color ? style.color : 'rgb(0, 0, 0)'};
//${props => props.style.color || 'rgb(0, 0, 0)'};`


