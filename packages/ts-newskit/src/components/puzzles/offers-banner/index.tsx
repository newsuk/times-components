import React from 'react';
import { TextBlock } from 'newskit';
import { ViewOffersButton, Container } from './styles';
import { NewsKitOffersBannerBg } from '../../../assets';

export const OffersBanner = () => {
  return (
    <Container>
      <TextBlock
        typographyPreset="editorialHeadline050"
        stylePreset="inkContrast"
        marginBlockEnd="space050"
        style={{ textAlign: 'center' }}
      >
        Looking for unlimited digital access?
      </TextBlock>
      <TextBlock
        typographyPreset="editorialSubheadline030"
        stylePreset="inkContrast"
        marginBlockEnd="space070"
        style={{ textAlign: 'center' }}
      >
        View all digital subscription offers
      </TextBlock>
      <ViewOffersButton>View offers</ViewOffersButton>
      <NewsKitOffersBannerBg />
    </Container>
  );
};
