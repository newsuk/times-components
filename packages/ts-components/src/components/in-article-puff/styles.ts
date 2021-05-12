// @ts-ignore
import styled from 'styled-components';
import {
  breakpoints,
  colours,
  fonts,
  spacing
} from '@times-components/styleguide';

type ContainerType = {
  hasImage: boolean;
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  padding: 20px;
  margin-right: ${spacing(2)};
  margin-bottom: ${spacing(4)};
  margin-left: ${spacing(2)};
  @media (min-width: ${breakpoints.medium}px) {
    flex-direction: row;
    width: 80.8%;
    margin: 0 auto ${spacing(4)};
  }
  @media (min-width: ${breakpoints.wide}px) {
    width: 56.2%;
  }
`;

export const ImageContainer = styled.a`
  padding-bottom: 13px;
  @media (min-width: ${breakpoints.medium}px) {
    width: 50%;
    padding-right: 20px;
    padding-bottom: 0px;
  }
`;

export const Label = styled.span<ContainerType>`
  font-family: ${fonts.supporting};
  font-size: 12px;
  color: #13354e;
  padding-bottom: 8px;
  @media (min-width: ${breakpoints.medium}px) {
    padding-top: ${(props: ContainerType) => (props.hasImage ? '4px' : 'none')};
    padding-bottom: 12px;
  }
`;

export const Headline = styled.a`
  font-family: ${fonts.headline};
  font-size: 24px;
  padding-bottom: 8px;
  text-decoration: none;
  color: ${colours.functional.brandColour};
  :hover {
    color: #069;
  }
  @media (min-width: ${breakpoints.wide}px) {
    font-size: 28px;
  }
`;

export const Copy = styled.span`
  font-family: ${fonts.body};
  color: ${colours.functional.secondary};
  font-size: 16px;
  padding-bottom: 20px;
`;

export const LinkText = styled.span`
  font-family: ${fonts.supporting};
  font-size: 16px;
  margin-right: 16px;
`;

export const ContentContainer = styled.div<ContainerType>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: ${breakpoints.medium}px) {
    width: ${(props: ContainerType) => (props.hasImage ? '50%' : '100%')};
  }
`;

export const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const LinkWrapper = styled.a<ContainerType>`
  display: flex;
  flex-direction: row;
  width: fit-content;
  text-decoration: none;
  color: #bf0000;
  :hover {
    color: ${colours.functional.secondary};
  }
  @media (min-width: ${breakpoints.medium}px) {
    padding-bottom: ${(props: ContainerType) =>
      props.hasImage ? '4px' : 'none'};
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
