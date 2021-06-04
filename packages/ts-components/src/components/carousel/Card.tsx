import React from 'react';
import { CardContainer, Headline, Label, Copy, TextContainer, Image } from './styles';

export const Card: React.FC<{
  headline: string;
  label: string;
  copy: string;
  image: string;
}> = ({ headline, label, copy, image }) => {
  return (
    <>
    <CardContainer>
      <TextContainer>
      <Label>{label}</Label>
      <Headline>{headline}</Headline>
      <Copy>{copy}</Copy>
      </TextContainer>
      <Image src={image} />
    </CardContainer>
    </>
  )
}