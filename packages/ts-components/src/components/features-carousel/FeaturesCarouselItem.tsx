import React from 'react';
import { FeaturesCarouselItemProps } from './FeaturesCarousel';
import { CarouselItem, CarouselContent } from './styles';

export const FeaturesCarouselItem: React.FC<FeaturesCarouselItemProps> = ({
  title,
  text,
  image,
  color,
  url,
}) => {
  return (
    <CarouselItem href={url}>
      <img src={image} alt={title} />
      <CarouselContent colours={color}>
        <h3>{title}</h3>
        <p>{text}</p>
      </CarouselContent>
    </CarouselItem>
  );
};
