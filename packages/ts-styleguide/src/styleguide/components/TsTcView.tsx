import styled from 'styled-components';
import { CSSProperties } from 'react';

type Style = CSSProperties | undefined;

export default styled.div<{ style?: Style }>`
  border: 0px solid black;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin: ${({ style }) => (style && style.margin ? style.margin : '0px')};
  border-bottom-color: ${({ style }) =>
    style && style.borderBottomColor ? style.borderBottomColor : 'black'};
  border-bottom-width: ${({ style }) =>
    style && style.borderBottomWidth ? style.borderBottomWidth : '0px'};
  border-radius: ${({ style }) =>
    style && style.borderRadius && style.borderRadius};
  overflow: ${({ style }) => style && style.overflow && style.overflow};
  height: ${({ style }) => style && style.height && style.height};
  width: ${({ style }) => style && style.width && style.width};
  margin: 0px;
  min-height: 0px;
  min-width: 0px;
  padding: 0px;
  position: relative;
  z-index: 0;
`;
