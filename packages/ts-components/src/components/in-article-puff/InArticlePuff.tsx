import React, { useState } from 'react';

import { IconForwardChevron } from '@times-components/icons';

import { Placeholder } from '../placeholder/Placeholder';
import { useFetch } from '../../helpers/fetch/FetchProvider';

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

export const InArticlePuff: React.FC<{
  sectionColour: string;
}> = ({ sectionColour }) => {
  const [colour, setColour] = useState('#bf0000');

  const { loading, error, data } = useFetch();

  if (loading) {
    return <Placeholder height={250} />;
  }

  if (error) {
    return null;
  }

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
    <Container
      style={{ borderTop: `2px ${sectionColour} solid` }}
      data-testid="InArticlePuff - Container"
    >
      {image ? (
        <ImageContainer href={link}>
          <Image src={image} />
        </ImageContainer>
      ) : null}

      <ContentContainer hasImage={hasImage}>
        <MainContentContainer>
          <Label hasImage={hasImage} style={{ color: sectionColour }}>
            {label}
          </Label>
          <Headline href={link}>{headline}</Headline>
          <Copy>{copy}</Copy>
        </MainContentContainer>

        <LinkWrapper
          href={link}
          hasImage={hasImage}
          onMouseOver={() => setColour('#696969')}
          onMouseLeave={() => setColour('#BF0000')}
        >
          <LinkText>{linkText ? linkText : 'Read more'}</LinkText>
          <IconForwardChevron fillColour={colour} height={18} width={8} />
        </LinkWrapper>
      </ContentContainer>
    </Container>
  );
};
