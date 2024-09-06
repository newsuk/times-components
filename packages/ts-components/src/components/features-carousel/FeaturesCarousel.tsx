import React from 'react';
import { FeaturesCarouselItem } from './FeaturesCarouselItem';
import {
  FeaturesCarouselContainer,
  FeaturesCarouselWindow,
  Header
} from './styles';

export type FeaturesCarouselItemProps = {
  title: string;
  text: string;
  image: string;
  color: {
    bg: string;
    title: string;
  };
  url: string;
};

type FeaturesCarouselProps = {
  heading: string;
  carouselItems: FeaturesCarouselItemProps[];
};

export const FeaturesCarousel: React.FC<FeaturesCarouselProps> = ({
  heading,
  carouselItems
}) =>
  carouselItems ? (
    <div id="benefits-carousel">
      <Header>{heading}</Header>
      <FeaturesCarouselContainer>
        <FeaturesCarouselWindow>
          {carouselItems.map(carouselItem => (
            <FeaturesCarouselItem {...carouselItem} />
          ))}
        </FeaturesCarouselWindow>
      </FeaturesCarouselContainer>
    </div>
  ) : null;