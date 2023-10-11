import React from 'react';
import { Button, Stack, TextBlock } from 'newskit';
import { Container, ViewOffersButton } from './styles';
import image from './image.png';

export const OffersBanner = () => {
  return (
    <div>
      <TextBlock
        typographyPreset="editorialHeadline050"
        stylePreset="inkContrast"
        marginBlockEnd="space050"
        style={{ textAlign: 'center' }}
      >
        gtgggs Looking for unlimited digital access?
      </TextBlock>
      <TextBlock
        typographyPreset="editorialSubheadline030"
        stylePreset="inkContrast"
        marginBlockEnd="space070"
        style={{ textAlign: 'center' }}
      >
        View all digital subscription offers
      </TextBlock>
      <img src={image} />
      <ViewOffersButton overrides={{ stylePreset: 'stylingOverrides' }}>
        View offers
      </ViewOffersButton>
    </div>
  );
};
