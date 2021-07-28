import React from 'react';
import {
  CardContainer,
  Credit,
  Copy,
  CardContent,
  Label,
  Headline,
  HeadlineButtonContainer,
  ImageTitle,
  MobileOrLarge,
  NotMobileOrLarge
} from './styles';
import { CarouselDataObj } from './GalleryCarousel';

export const Card: React.FC<{
  isLarge: boolean;
  isSmall: boolean;
  data: CarouselDataObj;
  headline: string;
  label: string;
  sectionColour: string;
}> = ({ children, isLarge, data, headline, label, isSmall, sectionColour }) => (
  <CardContainer isLarge={isLarge} isSmall={isSmall}>
    <CardContent>
      <Label sectionColour={sectionColour}>{label}</Label>
      <HeadlineButtonContainer>
        <Headline isLarge={isLarge}>{headline}</Headline>
        <MobileOrLarge isLarge={isLarge}>{children}</MobileOrLarge>
      </HeadlineButtonContainer>
      <NotMobileOrLarge isLarge={isLarge}>
        <div>
          {data.imageTitle && (
            <ImageTitle isLarge={isLarge}>{data.imageTitle}</ImageTitle>
          )}
          {data.copy && <Copy isLarge={isLarge}>{data.copy}</Copy>}
        </div>
        <div>
          <Credit isLarge={isLarge}>{data.credit}</Credit>
          {children}
        </div>
      </NotMobileOrLarge>
    </CardContent>
  </CardContainer>
);
