import styled from 'styled-components';
import { breakpoints, fonts, colours } from '@times-components/ts-styleguide';

export const PlaceholderContainer = styled.div`
  position: relative;
  height: 200px;
  margin: 0 auto 20px auto;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const Label = styled.div<{ sectionColour: string }>`
  font-family: ${fonts.supporting};
  font-size: 12px;
  line-height: 16px;
  text-transform: uppercase;
  color: ${({ sectionColour }) => `${sectionColour}`};
  padding-bottom: 5px;
  letter-spacing: 0.5px;
`;

export const HiddenDiv = styled.div`
  display: none;
`;

export const Copy = styled.div`
  color: ${colours.functional.secondary};
  font-family: ${fonts.body};
  font-size: 16px;
  line-height: 24px;
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

export const ShowAllButton = styled.button`
  font-family: ${fonts.supporting};
  font-weight: 500;
  line-height: 20px;
  border: 1px solid ${colours.functional.primary};
  background: transparent;
  cursor: pointer;
  &:active {
    border: 1px solid ${colours.functional.action};
    color: ${colours.functional.action};
  }
`;
