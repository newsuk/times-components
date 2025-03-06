import styled from 'styled-components';

import { colours, fonts } from '@times-components/ts-styleguide';
import { IconActivityIndicator } from '@times-components/icons';

export const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingIcon = styled(IconActivityIndicator)`
  background-color: ${colours.functional.whiteGrey};
  border-radius: 9999;
  overflow: hidden;
`;

export const SaveStarText = styled.div`
  margin-right: 15px;
  color: ${colours.functional.secondary};
  font-family: ${fonts.supporting};
  font-size: 14px;
  line-height: 14px;
`;

export const SaveStarButton = styled.button`
  display: flex;
  justify-content: center;
  padding: 0;
  background-color: ${colours.functional.white};
  border: 0;
  border-radius: 40px;
  outline: 0;
  cursor: pointer;

  &:hover {
    background-color: ${colours.functional.whiteGrey};
  }

  &:active {
    background-color: ${colours.functional.keyline};
  }
`;
