import React, { useState } from 'react';

import { IconForwardChevron } from '@times-components/icons';

import { Placeholder } from '../placeholder/Placeholder';
import { useFetch } from '../../helpers/fetch/FetchProvider';

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

export const InArticlePuff: React.FC<{
  sectionColour: string;
}> = ({ sectionColour }) => {
  const [colour, setColour] = useState('#bf0000');

  const { loading, error, data } = useFetch();

  if (loading) {
    return <Placeholder height={200} />;
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
        <ImageContainer>
          <a href={link}>
            <img src={image} />
          </a>
        </ImageContainer>
      ) : null}

      <ContentContainer hasImage={hasImage}>
        <div>
          <Label hasImage={hasImage} style={{ color: sectionColour }}>
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
          onMouseLeave={() => setColour('#BF0000')}
        >
          <LinkText>{linkText ? linkText : 'Read more'}</LinkText>
          <IconForwardChevron fillColour={colour} height={18} width={8} />
        </Link>
      </ContentContainer>
    </Container>
  );
};
