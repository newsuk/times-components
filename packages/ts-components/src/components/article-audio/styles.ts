import styled from 'styled-components';

export const AudioButton = styled.button`
  background-color: unset;
  border-radius: 0;
  padding: 7px 11px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  color: #333;
  font-family: Roboto;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;

  svg {
    margin-right: 8px;
  }

  span {
    margin-left: 4px;
    font-size: 12px;
    color: #696969;
  }
`;
