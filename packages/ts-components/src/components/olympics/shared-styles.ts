import styled from 'styled-components';
import { colours, fonts } from '@times-components/styleguide';

const highlightColour = '#e4e4e4';
export const olympicColour = '#402f7a';

export const HeadingContainer = styled.div`
  background: ${colours.functional.backgroundPrimary};
  padding: 20px 0;
  text-align: center;
  margin: 0px;
`;

export const Button = styled.button`
  font-family: ${fonts.supporting};
  font-size: 14px;
  line-height: 20px;
  padding: 14px 16px;
  border: 1px solid ${colours.functional.keyline};

  top: -80px;
  position: relative;

  cursor: pointer;

  &:hover {
    background-color: ${highlightColour};
  }
`;

export const Label = styled.span`
  font-size: 12px;
  line-height: 14px;
  color: ${olympicColour};
  font-family: ${fonts.supporting};
  font-weight: normal;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Heading = styled.div`
  font-size: 24px;
  line-height: 18px;
  font-family: ${fonts.headline};
  margin: 14px 0 10px 0;
  @media only screen and (min-width: 768px) {
    font-size: 32px;
  }
`;
