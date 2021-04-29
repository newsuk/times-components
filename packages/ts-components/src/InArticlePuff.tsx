import React, { useState } from 'react';
// @ts-ignore
import styled from 'styled-components';

import {
  breakpoints,
  colours,
  fonts,
  spacing,
} from '@times-components/styleguide';

import { IconForwardArrow } from '@times-components/icons';


type InArticlePuffProps = {
  label: string,
  imageUri?: string,

  headline: string,
  copy: string,
  link: string,
  linkText: string,
}

type ContainerType = {
  imageUri?: string,
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F9F9F9;
  border-top: 2px #13354E solid;
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
    width: 56.2%
  }
`

const ImageContainer = styled.a`
  padding-bottom: 13px;
  @media (min-width: ${breakpoints.medium}px) {
  width: 50%;
  padding-right: 20px;
  padding-bottom: 0px;
}
`;

const Label = styled.span<ContainerType>`
  font-family: ${fonts.supporting};
  font-size: 12px;
  color: #13354E;
  padding-bottom: 8px;
  @media (min-width: ${breakpoints.medium}px) {
    padding-top: ${( props: ContainerType ) => props.imageUri ? '4px' : 'none'};
    padding-bottom: 12px;
  }
`;

const Headline = styled.a`
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

const Copy = styled.span`
  font-family: ${fonts.body};
  color: ${colours.functional.secondary};
  font-size: 16px;
  padding-bottom: 20px;
`;

const LinkText = styled.span`
  font-family: ${fonts.supporting};
  font-size: 16px;
  margin-right: 16px;
`;

const ContentContainer = styled.div<ContainerType>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: ${breakpoints.medium}px) {
   width: ${( props: ContainerType ) => props.imageUri ? '50%' : '100%'};
}
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const LinkWrapper = styled.a<ContainerType>`
  display: flex;
  flex-direction: row;
  align-items: top;
  width: fit-content;
  text-decoration: none;
  color: #BF0000;
  :hover {
    color: ${colours.functional.secondary};
  }
  @media (min-width: ${breakpoints.medium}px) {
    padding-bottom: ${( props: ContainerType ) => props.imageUri ? '4px' : 'none'};
  }
`

const Image = styled.img`
  width: 100%;
  object-fit: contain;
`


const InArticlePuff: React.FC<InArticlePuffProps> = ({
  label,
  imageUri,
  headline,
  copy,
  link,
  linkText
}) => {
  const [colour, setColour] = useState('#BF0000')

return (
  <Container>
    {
      imageUri ? (
        <ImageContainer href={link}>
          <Image src={imageUri} />
        </ImageContainer>) : null
    }
    <ContentContainer imageUri={imageUri}>
      <MainContentContainer>
        <Label imageUri={imageUri}>{label}</Label>
        <Headline href={link}>{headline}</Headline>
        <Copy>{copy}</Copy>
      </MainContentContainer>
      <LinkWrapper href={link} imageUri={imageUri} onMouseOver={() => setColour('#696969')} onMouseLeave={() => setColour('#BF0000')}>
        <LinkText>{linkText}</LinkText>
        <IconForwardArrow fillColour={colour} height={18} width={8} />
      </LinkWrapper>
    </ContentContainer>
  </Container>
);
  }

export default InArticlePuff;
