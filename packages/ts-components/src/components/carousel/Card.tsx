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
import { sanitiseCopy } from '../../helpers/text-formatting/SanitiseCopy';
import { CarouselDataObj } from './types';

export const Card: React.FC<{
  isWide: boolean;
  isSmall: boolean;
  data: CarouselDataObj;
  headline: string;
  label: string;
  sectionColour: string;
}> = ({ children, isWide, data, headline, label, isSmall, sectionColour }) => {
  const cardData = data.data;
  return (
    <CardContainer isWide={isWide} isSmall={isSmall}>
      <CardContent>
        <Label sectionColour={sectionColour}>{label}</Label>
        <HeadlineButtonContainer>
          <Headline isWide={isWide}>{headline}</Headline>
          <MobileOrLarge isWide={isWide}>{children}</MobileOrLarge>
        </HeadlineButtonContainer>
        <NotMobileOrLarge isWide={isWide}>
          <div>
            {cardData.imageTitle && (
              <ImageTitle isWide={isWide}>{cardData.imageTitle}</ImageTitle>
            )}
            {cardData.copy && (
              <Copy
                isWide={isWide}
                dangerouslySetInnerHTML={{
                  __html: sanitiseCopy(cardData.copy, ['br', 'b', 'i'])
                }}
              />
            )}
          </div>
          <div>
            <Credit isWide={isWide}>{cardData.credit}</Credit>
            {children}
          </div>
        </NotMobileOrLarge>
      </CardContent>
    </CardContainer>
  );
};
