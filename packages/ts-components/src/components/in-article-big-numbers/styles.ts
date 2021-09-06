import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

export const Container = styled.div<{
  sectionColour: string;
  isWide?: boolean;
}>`
  margin: 0 auto 20px auto;
  padding: 23px 0 0;
  background-color: ${colours.functional.backgroundPrimary};
  border-top: ${({ sectionColour }) => `2px solid ${sectionColour}`};
  width: ${({ isWide }) => (isWide ? '100%' : 'auto')};

  @media (min-width: ${breakpoints.medium}px) {
    width: ${({ isWide }) => (isWide ? '100%' : '80.8%')};
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: ${({ isWide }) => (isWide ? '100%' : '56.2%')};
  }

  a {
    text-decoration: none;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 16px;
`;

export const Headline = styled.div`
  font-family: ${fonts.headline};
  font-size: 24px;
  line-height: 24px;
  color: ${colours.functional.brandColour};
  margin: 0 0 6px;
  @media (min-width: ${breakpoints.medium}px) {
    font-size: 32px;
    line-height: 32px;
  }
`;

export const ShowAllContainer = styled.div<{
  showAll: boolean;
  displayShowAll: boolean;
}>`
  display: flex;
  border-top: 1px solid ${colours.functional.keyline};
  padding: 5px;
  justify-content: center;
  display: ${({ displayShowAll: displayShowAll }) =>
    displayShowAll ? 'flex' : 'none'};
`;

export const ShowAllButton = styled.button`
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
  showAll: boolean;
  maxHeight: number;
  displayShowAll: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  max-height: ${({ showAll, maxHeight, displayShowAll }) =>
    !showAll && displayShowAll ? maxHeight + 'px' : 'none'};
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -2px -1px -15px;
  list-style: none;
  padding: 0;
  @media (min-width: ${breakpoints.medium}px) {
  }
`;

export const ListItem = styled.li<{
  isStandard?: boolean;
}>`
  flex: 1 0 50%;
  padding: 12px 16px 13px 0;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: ${colours.functional.keyline};
  padding-left: 16px;

  &:empty {
    height: 0;
    border: none;
  }
  &:before,
  :after {
    box-sizing: border-box;
  }

  @media (min-width: ${breakpoints.medium}px) {
    flex: 1 0 ${({ isStandard }) => (isStandard ? '50%' : '33%')};
  }
`;

export const NumberContainer = styled.div<{ sectionColour: string }>`
  font-family: ${fonts.headline};
  font-size: 32px;
  line-height: 32px;
  margin-bottom: 4px;
  color: ${({ sectionColour }) => `${sectionColour}`};
  @media (min-width: ${breakpoints.medium}px) {
    font-size: 50px;
    line-height: 40px;
  }
`;

export const Copy = styled.div`
  color: ${colours.functional.secondary};
  font-family: ${fonts.body};
  font-size: 16px;
  line-height: 24px;
`;
