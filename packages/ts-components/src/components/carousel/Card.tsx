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
  isLarge: boolean;
  isSmall: boolean;
  data: CarouselDataObj;
  headline: string;
  label: string;
  sectionColour: string;
}> = ({ children, isLarge, data, headline, label, isSmall, sectionColour }) => {
  const cardData = data.data;
  return (
    <CardContainer isLarge={isLarge} isSmall={isSmall}>
      <CardContent>
        <Label sectionColour={sectionColour}>{label}</Label>
        <HeadlineButtonContainer>
          <Headline isLarge={isLarge}>{headline}</Headline>
          <MobileOrLarge isLarge={isLarge}>{children}</MobileOrLarge>
        </HeadlineButtonContainer>
        <NotMobileOrLarge isLarge={isLarge}>
          <div>
            {cardData.imageTitle && (
              <ImageTitle isLarge={isLarge}>{cardData.imageTitle}</ImageTitle>
            )}
            {cardData.copy && <Copy isLarge={isLarge} dangerouslySetInnerHTML={{ __html: sanitiseCopy(cardData.copy, ['br', 'b', 'i'])}}/> }
          </div>
          <div>
            <Credit isLarge={isLarge}>{cardData.credit}</Credit>
            {children}
          </div>
        </NotMobileOrLarge>
      </CardContent>
    </CardContainer>
  );
};