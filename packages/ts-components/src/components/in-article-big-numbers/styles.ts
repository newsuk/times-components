import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/ts-styleguide';
import { ShowAllButton } from '../common-styles';

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

export const StyledShowAllButton = styled(ShowAllButton)`
  font-size: 12px;
  margin: 15px 0;
  padding: 8px 12px 7px;
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
