import styled from 'styled-components';
// not sure how else to put the default styles, this the default style for a React Native <Text/> component
import { CSSProperties } from 'react';

type Style = CSSProperties | undefined;

export default styled.div<{ style?: Style }>`
  border: 0px solid black;
  box-sizing: border-box;
  color: ${({ style }) =>
    style && style.color ? style.color : 'rgb(0, 0, 0)'};
  display: inline;
  font: 14px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', sans-serif;
  margin: 0px;
  padding: 0px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: ${({ style }) =>
    style && style.fontSize ? style.fontSize : '14px'};
  font-weight: ${({ style }) => style && style.fontWeight && style.fontWeight};
  margin-bottom: ${({ style }) =>
    style && style.marginBottom ? style.marginBottom : '0px'};
  margin-left: ${({ style }) =>
    style && style.marginLeft ? style.marginLeft : '0px'};
  margin-top: ${({ style }) =>
    style && style.marginTop ? style.marginTop : '0px'};
  font-family: ${({ style }) =>
    style && style.fontFamily
      ? style.fontFamily
      : 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif'};
`;
