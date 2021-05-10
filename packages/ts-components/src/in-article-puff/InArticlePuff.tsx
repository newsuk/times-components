import React, { useState } from 'react';

import { IconForwardChevron } from '@times-components/icons';

import { useFetch } from '../fetch/FetchProvider';

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

export const InArticlePuff = () => {
  const { loading, error, data } = useFetch();

  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  const [colour, setColour] = useState('#BF0000');

  const {
    image,
    label,
    headline,
    copy,
    link,
    linkText
  } = data.body.data[0].data;

  const hasImage = Boolean(image);

  return (
    <Container>
      {image && (
        <ImageContainer href={link}>
          <Image src={image} />
        </ImageContainer>
      )}

      <ContentContainer hasImage={hasImage}>
        <MainContentContainer>
          <Label hasImage={hasImage}>{label}</Label>
          <Headline href={link}>{headline}</Headline>
          {copy && <Copy>{copy}</Copy>}
        </MainContentContainer>

        <LinkWrapper
          href={link}
          hasImage={hasImage}
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
