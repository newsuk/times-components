import React, { useState } from 'react';

import { IconForwardChevron } from '@times-components/icons';

import { useFetch } from '../fetch/FetchProvider';

import {
  Container,
  ImageContainer,
  ContentContainer,
  Label,
  Headline,
  Copy,
  Link,
  LinkText
} from './styles';

export const InArticlePuff: React.FC<{ sectionColour: string }> = ({
  sectionColour
}) => {
  const [colour, setColour] = useState('#bf0000');

  const { loading, error, data } = useFetch();

  if (loading) {
    return null;
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
    <Container sectionColour={sectionColour}>
      {image ? (
        <ImageContainer>
          <a href={link}>
            <img src={image} />
          </a>
        </ImageContainer>
      ) : null}

      <ContentContainer hasImage={hasImage}>
        <div>
          <Label hasImage={hasImage} sectionColour={sectionColour}>
            {label}
          </Label>
          <a href={link}>
            <Headline hasImage={hasImage}>{headline}</Headline>
          </a>
          {copy && <Copy hasImage={hasImage}>{copy}</Copy>}
        </div>

        <Link
          href={link}
          onMouseOver={() => setColour('#696969')}
          onMouseLeave={() => setColour('#bf0000')}
        >
          <LinkText>{linkText}</LinkText>
          <IconForwardChevron fillColour={colour} width={8} height={16} />
        </Link>
      </ContentContainer>
    </Container>
  );
};
