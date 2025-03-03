import styled from 'styled-components';
import { CSSProperties } from 'react';

type Style = CSSProperties | undefined;

export default styled.div<{ style?: Style }>`
  height: 500px;
  overflow-y: scroll;
  white-space: nowrap;
`;
