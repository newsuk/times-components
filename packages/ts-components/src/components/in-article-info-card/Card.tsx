import React from 'react';
import {
  CardContainer,
  CardContent,
  Label,
  Headline,
  HeadlineButtonContainer
} from './styles';
import { InfoCardData } from './InfoCard';

export const Card: React.FC<{
  data: InfoCardData;
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
