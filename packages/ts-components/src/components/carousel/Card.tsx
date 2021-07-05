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
  NotMobileOrLarge,
} from './styles';
import { DataObj } from './GalleryCarousel';

export const Card: React.FC<{
  isLarge: boolean;
  isSmall: boolean;
  data: DataObj;
  sectionColour: string;
}> = ({ children, isLarge, data, isSmall, sectionColour }) => {
  return (
    <CardContainer isLarge={isLarge} isSmall={isSmall}>
      <CardContent>
        <Label sectionColour={sectionColour}>
          {data.paneldata.label}
        </Label>
        <HeadlineButtonContainer>
          <Headline>{data.paneldata.headline}</Headline>
          <MobileOrLarge isLarge={isLarge}>
            {children}
          </MobileOrLarge>
        </HeadlineButtonContainer>
          <NotMobileOrLarge isLarge={isLarge}>
            <ImageTitle>{data.paneldata.imageTitle}</ImageTitle>
            <Copy isLarge={isLarge}>{data.paneldata.copy}</Copy>
            <Credit>{data.paneldata.credit}</Credit>
            {children}
          </NotMobileOrLarge>
      </CardContent>
    </CardContainer>
  )
};