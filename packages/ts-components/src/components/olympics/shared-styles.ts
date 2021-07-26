import styled from 'styled-components';
import { colours, fonts } from '@times-components/styleguide';

export const Heading = styled.h2`
  background: ${colours.functional.backgroundPrimary};
  padding: 20px 0 10px 0;
  text-align: center;
  margin: 0px;
`;

export const Span = styled.span<{ sectionColour: string }>`
    font-size: 12px;
    line-height: 14px;
    color: ${({ sectionColour }) => sectionColour};
    font-family: ${fonts.supporting};
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 1px;
`;