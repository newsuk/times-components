import styled from 'styled-components';
import { breakpoints, colours, fonts } from '@times-components/styleguide';

export const Container = styled.div<{
  sectionColour: string;
}>`
  margin: 0 auto 20px auto;
  padding: 23px 0 0;
  background-color: ${colours.functional.backgroundPrimary};
  border-top: ${({ sectionColour }) => `2px solid ${sectionColour}`};
  width: 100%;

  @media (min-width: ${breakpoints.medium}px) {
    width: 80.8%;
  }

  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
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

export const ListItem = styled.li`
  padding: 12px 0 13px;
  width: 100%;  
  position: relative;
`;

export const LeftPanel = styled.div<{
  sectionColour: string;
  circularImage: string;
}>`
  display: table;
  float: left;
  width: ${({ circularImage }) => (circularImage ? '80px' : '40px')};
  text-align: center;
  padding-right: ${({ circularImage }) => (circularImage ? '16px' : '24px')};
  height: 100%;

  & img{
    border-radius: 100%;
    height: 50px;
    width: 50px;
    position: relative;
    margin-left: 16px;
    z-index: 2;
  }

  & :before{
    content: '';
    background: ${({ sectionColour }) => `${sectionColour}`};   
    position: relative;
    top: 0px;
    left: 15px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    z-index: 1;
    display: ${({ circularImage }) => (circularImage ? 'none' : 'block')}
  } 

  & :after{
    content: '';
    border-right: 1px solid #ccc;
    height: 100%;
    display: block;
    position: absolute;
    top: ${({ circularImage }) => (circularImage ? '60px' : '20px')};
    left: ${({ circularImage }) => (circularImage ? '42px' : '19px')};
    z-index: 1;
  } 

  @media (min-width: ${breakpoints.medium}px) {
    width: ${({ circularImage }) => (circularImage ? '100px' : '40px')};
    padding-right: ${({ circularImage }) => (circularImage ? '17px' : '24px')};
    & img{
      height: 76px;
      width: 76px;
    }
    & :after{
      top: ${({ circularImage }) => (circularImage ? '74px' : '20px')};
      left: ${({ circularImage }) => (circularImage ? '52px' : '19px')};
    } 
  }
`;

export const RightPanel = styled.div`
  display: grid;
`;

export const Date = styled.div<{ sectionColour: string }>`
  font-family: ${fonts.supporting};
  text-transform: uppercase;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 6px;
  color: ${({ sectionColour }) => `${sectionColour}`};
`;

export const SubHeading = styled.div`
  font-size: 20px;
  line-height: 20px;
  color: ${colours.functional.brandColour};
  font-family: ${fonts.headlineRegular};
  margin-bottom: 6px;
  @media (min-width: ${breakpoints.medium}px) {
    font-size: 24px;
    line-height: 24px;
  }
`;

export const Copy = styled.div`
  color: ${colours.functional.secondary};
  font-family: ${fonts.body};
  font-size: 16px;
  line-height: 24px;
`;
