import React, { useState } from 'react';

import { IconForwardChevron } from '@times-components/icons';

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

type InArticlePuffProps = {
  label: string;
  imageUri?: string;
  headline: string;
  copy: string;
  link: string;
  linkText: string;
  sectionColour: string;
};

export const InArticlePuff: React.FC<InArticlePuffProps> = ({
  label,
  imageUri,
  headline,
  copy,
  link,
  linkText,
  sectionColour
}) => {
  const [colour, setColour] = useState('#bf0000');

  const hasImage = Boolean(imageUri);

  console.log('wanky 2 !!!');

  return (
    <Container sectionColour={sectionColour}>
      {imageUri ? (
        <ImageContainer>
          <a href={link}>
            <img src={imageUri} />
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
