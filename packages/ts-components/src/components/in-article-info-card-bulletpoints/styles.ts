import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/ts-styleguide';

export const Container = styled.div<{ sectionColour: string }>`
  margin: 0 auto 20px auto;
  padding: 20px 0 0;
  background-color: ${colours.functional.backgroundPrimary};
  border-top: ${({ sectionColour }) => `2px solid ${sectionColour}`};

  a {
    text-decoration: none;
  }

  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
`;

export const Headline = styled.div`
  font-family: ${fonts.headline};
  font-size: 24px;
  line-height: 24px;
  color: ${colours.functional.brandColour};
  @media (min-width: ${breakpoints.medium}px) {
    font-size: 32px;
    line-height: 32px;
  }
`;

export const ReadMoreContainer = styled.div<{
  readMore: boolean;
  showReadMore: boolean;
}>`
  display: flex;
  border-top: 1px solid ${colours.functional.keyline};
  margin-top: ${({ readMore }) => (readMore ? '0' : '15px')};
  padding: 5px;
  justify-content: center;
  display: ${({ showReadMore }) => (showReadMore ? 'flex' : 'none')};
  @media (min-width: ${breakpoints.medium}px) {
    display: none;
  }
`;

export const ReadMoreButton = styled.button`
  font-size: 12px;
  font-family: ${fonts.supporting};
  font-weight: 500;
  line-height: 20px;
  border: 1px solid ${colours.functional.primary};
  background: transparent;
  margin: 15px 0;
  padding: 10px 12px 5px;
  cursor: pointer;
  &:active {
    border: 1px solid ${colours.functional.action};
    color: ${colours.functional.action};
  }
`;

export const ListContainer = styled.div<{
  readMore: boolean;
  maxHeight: number;
  showReadMore: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  max-height: ${({ readMore, maxHeight, showReadMore }) =>
    !readMore && showReadMore ? maxHeight + 'px' : 'none'};
  @media (min-width: ${breakpoints.medium}px) {
    max-height: none;
  }
`;

export const List = styled.ul`
  column-count: 1;
  column-gap: 25px;
  column-rule: 1px solid ${colours.functional.keyline};
  margin-left: 0;
  padding: 0;
  @media (min-width: ${breakpoints.medium}px) {
    column-count: 2;
    margin-bottom: 20px;
  }
`;

export const ListItem = styled.li`
  color: ${colours.functional.secondary};
  font-family: ${fonts.body};
  font-size: 16px;
  line-height: 24px;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
  margin: 0 5px 13px 0;
  padding-left: 15px;
  list-style: none;
  position: relative;
  & :last-child {
    margin-bottom: 0;
  }
  & ::before {
    content: '';
    position: absolute;
    left: 3px;
    top: 7px;
    width: 6px;
    height: 6px;
    background-color: ${colours.functional.primary};
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }
`;
