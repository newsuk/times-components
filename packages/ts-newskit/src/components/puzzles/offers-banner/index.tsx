import React, { FC } from 'react';
import {
  ViewOffersButton,
  Container,
  Title,
  Subtitle,
  Background
} from './styles';
import { backgroundImage } from './data';

export interface OffersBannerProps {
  onClick?: () => void;
}

export const OffersBanner: FC<OffersBannerProps> = ({ onClick }) => {
  const handleClick = () => {
    onClick && onClick();
  };

  return (
    <Container>
      <Title
        typographyPreset={{
          xs: 'editorialHeadline040',
          md: 'editorialHeadline050'
        }}
        stylePreset="inkContrast"
        marginBlockEnd="space050"
      >
        Looking for unlimited digital access?
      </Title>
      <Subtitle
        typographyPreset={{
          xs: 'editorialSubheadline020',
          md: 'editorialSubheadline030'
        }}
        stylePreset="inkContrast"
        marginBlockEnd="space070"
      >
        View all digital subscription offers
      </Subtitle>
      <ViewOffersButton
        onClick={handleClick}
        href="https://www.thetimes.co.uk/subscribe/digital/?ilc=sub_benefit_page_bottom"
      >
        View offers
      </ViewOffersButton>
      <Background src={backgroundImage} />
    </Container>
  );
};
