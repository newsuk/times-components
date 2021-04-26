import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  breakpoints,
  colours,
  fonts,
} from "@times-components/styleguide";
import Image from "@times-components/image";
import { IconForwardArrow } from "@times-components/icons";

const Container = styled.div`
  height: ${({ imageUri }) => imageUri ? '414px' : '274px'};
  width: 100%;
  background-color: #F9F9F9;
  border-top: 2px #13354E solid;
  display: flex;
  flex-direction: column;
  padding: 20px;
  @media (min-width: ${breakpoints.medium}px) {
    height: 208px;
    flex-direction: row;
  }
  @media (min-width: ${breakpoints.wide}px) {
    height: 240px;
  }
`;

const ImageContainer = styled.div`
  @media (min-width: ${breakpoints.medium}px) {
  width: 50%;
  padding-right: 20px;
}
`;

const Label = styled.span`
  font-family: ${fonts.supporting};
  font-size: 12px;
  color: #13354E;
  padding-bottom: 8px;
`;

const Headline = styled.span`
  font-family: ${fonts.headline};
  font-size: 24px;
  padding-bottom: 8px;
  @media (min-width: ${breakpoints.wide}px) {
    font-size: 28px;
  }
`;

const Copy = styled.span`
  font-family: ${fonts.body};
  color: ${colours.functional.secondary};
  font-size: 16px;
`;

const LinkText = styled.span`
  font-family: ${fonts.supporting};
  font-size: 16px;
  color: #BF0000;
  margin-right: 16px;
`;

const ContentContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: ${breakpoints.medium}px) {
   width: ${({ imageUri }) => imageUri ? '50%' : '100%'};
}
`;

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const LinkWrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: top;
  width: fit-content;
  text-decoration: none;
`

const InArticlePuff = ({
  label,
  imageUri,
  headline,
  copy,
  link,
  linkText
}) => (
  <Container imageUri={imageUri}>
    {
      imageUri ? (
        <ImageContainer>
          <Image aspectRatio={1.42} uri={imageUri}/>
        </ImageContainer>) : null
    }
    <ContentContainer imageUri={imageUri}>
      <MainContentContainer>
        <Label>{label}</Label>
        <Headline>{headline}</Headline>
        <Copy>{copy}</Copy>
      </MainContentContainer>
      <LinkWrapper href={link}>
        <LinkText>{linkText}</LinkText>
        <IconForwardArrow fillColour="#BF0000" height={16} width={8} />
      </LinkWrapper>
    </ContentContainer>
  </Container>
);

const defaultProps = {
  imageUri: null,
}

const propTypes = {
  label: PropTypes.string.isRequired,
  imageUri: PropTypes.string,
  copy: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
};

InArticlePuff.propTypes = propTypes;
InArticlePuff.defaultProps = defaultProps;

export default InArticlePuff;