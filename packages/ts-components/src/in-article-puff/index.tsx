import React, { useState } from 'react';

import { IconForwardChevron } from '@times-components/icons';

import {
  Container,
  ImageContainer,
  Image,
  ContentContainer,
  MainContentContainer,
  Label,
  Headline,
  Copy,
  LinkWrapper,
  LinkText
} from './styles';

type InArticlePuffProps = {
  label: string;
  imageUri?: string;
  headline: string;
  copy: string;
  link: string;
  linkText: string;
  sectionColour: string;
};

const InArticlePuff: React.FC<InArticlePuffProps> = ({
  label,
  imageUri,
  headline,
  copy,
  link,
  linkText,
  sectionColour
}) => {
  const [colour, setColour] = useState('#BF0000');

  return (
    <Container
      style={{ borderTop: `2px ${sectionColour} solid` }}
      data-testid="InArticlePuff - Container"
    >
      {imageUri ? (
        <ImageContainer href={link}>
          <Image src={imageUri} />
        </ImageContainer>
      ) : null}
      <ContentContainer imageUri={imageUri}>
        <MainContentContainer>
          <Label imageUri={imageUri} style={{ color: sectionColour }}>
            {label}
          </Label>
          <Headline href={link}>{headline}</Headline>
          <Copy>{copy}</Copy>
        </MainContentContainer>
        <LinkWrapper
          href={link}
          imageUri={imageUri}
          onMouseOver={() => setColour('#696969')}
          onMouseLeave={() => setColour('#BF0000')}
        >
          <LinkText>{linkText}</LinkText>
          <IconForwardChevron fillColour={colour} height={18} width={8} />
        </LinkWrapper>
      </ContentContainer>
    </Container>
  );
};

export default InArticlePuff;
