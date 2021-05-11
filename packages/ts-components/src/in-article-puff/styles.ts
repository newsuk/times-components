import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

export const Container = styled.div<{ sectionColour?: string }>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f9f9f9;
  border-top: 2px solid
    ${({ sectionColour }) =>
      sectionColour ? sectionColour : colours.functional.brandColour};

  a {
    text-decoration: none;
  }

  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
  }
`;

export const ImageContainer = styled.div`
  padding-bottom: 12px;

  img {
    display: block;
    width: 100%;
  }

  @media (min-width: ${breakpoints.medium}px) {
    width: 50%;
    padding-right: 20px;
    padding-bottom: 0;
  }
`;

export const ContentContainer = styled.div<{ hasImage?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: ${breakpoints.medium}px) {
    width: ${({ hasImage }) => (hasImage ? '50%' : '100%')};
  }
`;

export const Label = styled.div<{ hasImage?: boolean; sectionColour?: string }>`
  padding-bottom: ${({ hasImage }) => (hasImage ? '8px' : '12px')};
  color: ${({ sectionColour }) =>
    sectionColour ? sectionColour : colours.functional.brandColour};
  font-family: ${fonts.supporting};
  font-size: 12px;
  text-transform: uppercase;
`;

export const Headline = styled.h4<{ hasImage?: boolean }>`
  margin: 0;
  padding-bottom: 8px;
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headline};
  font-size: 24px;
  line-height: 24px;
  font-weight: normal;

  :hover {
    color: #069;
  }

  @media (min-width: ${breakpoints.wide}px) {
    font-size: ${({ hasImage }) => (hasImage ? '24px' : '28px')};
    line-height: ${({ hasImage }) => (hasImage ? '24px' : '28px')};
  }
`;

export const Copy = styled.div<{ hasImage?: boolean }>`
  padding-bottom: ${({ hasImage }) => (hasImage ? '16px' : '20px')};
  color: ${colours.functional.secondary};
  font-family: ${fonts.body};
  font-size: 16px;
  line-height: 24px;
`;

export const Link = styled.a`
  display: flex;
  flex-direction: row;
  color: #bf0000;

  :hover {
    color: ${colours.functional.secondary};
  }
`;

export const LinkText = styled.div`
  margin-top: 1px;
  margin-right: 12px;
  font-family: ${fonts.supporting};
  font-size: 16px;
`;
