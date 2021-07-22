import React from 'react';
import {
  CardContainer,
  CardContent,
  Label,
  Headline,
  HeadlineButtonContainer
} from './styles';
import { InfoCardDataObj } from './InfoCard';

export const Card: React.FC<{
  data: InfoCardDataObj;
  headline: string;
  label: string;
  sectionColour: string;
}> = ({ sectionColour, label, headline, children }) => (
  <CardContainer>
    <CardContent>
      <Label sectionColour={sectionColour}>{label}</Label>
      <HeadlineButtonContainer>
        <Headline>{headline}</Headline>
        {children}
      </HeadlineButtonContainer>
    </CardContent>
  </CardContainer>
);
