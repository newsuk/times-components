import styled from 'styled-components';

export const WidgetButton = styled.button<{ disabled: boolean }>`
  background-color: transparent;
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  padding: 0 12px;
  height: 36px;
  border: 1px solid ${({ disabled }) => (disabled ? '#EEE' : '#CCC')};
  color: ${({ disabled }) => (disabled ? '#AAA' : '#333')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: block;
  margin: 0 auto;
`;
