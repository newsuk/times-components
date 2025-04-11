import styled from 'styled-components';
import { colours, breakpoints } from '@times-components/ts-styleguide';

export const AudioDuration = styled.span`
  display: none;

  @media (min-width: ${breakpoints.small}px) {
    display: block;
  }
`;
export const AudioButton = styled.button`
  background-color: unset;
  border-radius: 0;
  padding: 6px 11px;
  border: 1px solid ${colours.functional.primary};
  display: flex;
  align-items: center;
  color: ${colours.functional.primary};
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
    color: ${colours.functional.secondary};
  }
`;
