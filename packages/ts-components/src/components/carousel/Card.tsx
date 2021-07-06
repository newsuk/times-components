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
          <Headline isLarge={isLarge}>{data.paneldata.headline}</Headline>
          <MobileOrLarge isLarge={isLarge}>
            {children}
          </MobileOrLarge>
        </HeadlineButtonContainer>
          <NotMobileOrLarge isLarge={isLarge}>
            <div>
              {
                data.paneldata.imageTitle && <ImageTitle isLarge={isLarge}>{data.paneldata.imageTitle}</ImageTitle>
              }
              {
                data.paneldata.copy && <Copy isLarge={isLarge}>{data.paneldata.copy}</Copy>
              }
            </div>
            <div>
            <Credit isLarge={isLarge}>{data.paneldata.credit}</Credit>
            {children}
            </div>
          </NotMobileOrLarge>
      </CardContent>
    </CardContainer>
  )
};