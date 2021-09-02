import React from 'react';
import {
  CardContainer,
  CardContent,
  Headline,
  HeadlineButtonContainer
} from './styles';
import { Label } from '../common-styles';
import { InfoCardData } from './InfoCard';

export type CardProps = {
  headline: string;
  label: string;
  sectionColour: string;
  data: InfoCardData;
};

export const Card: React.FC<CardProps> = ({
  sectionColour,
  label,
  headline,
  children
}) => (
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
