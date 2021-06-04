import React from 'react';
import { Headline, Label, Copy, TextContainer, CardContainer } from './styles';

export const Card: React.FC<{
  headline: string;
  label: string;
  copy: string;
}> = ({ headline, label, copy, children }) => {
  return (
    <CardContainer>
      <TextContainer>
      <Label>{label}</Label>
      <Headline>{headline}</Headline>
      <Copy>{copy}</Copy>
</TextContainer>
        {children}
      </CardContainer>
  )
}