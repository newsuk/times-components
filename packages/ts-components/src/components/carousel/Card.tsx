import React from 'react';
import { Headline, Label, Copy, CardContainer, Credit } from './styles';

export const Card: React.FC<{
  headline: string;
  label: string;
  copy: string;
  isLarge: boolean;
  credit: string;
}> = ({ headline, label, copy, children, isLarge, credit }) => {
  return (
    <CardContainer isLarge={isLarge}>
      <div style={{ height: '100%' }}>
        <Label>{label}</Label>
        <Headline>{headline}</Headline>
        <Copy>{copy}</Copy>
        {isLarge || window.innerWidth < 1024 ? null : <Credit>{credit}</Credit>}
      </div>
      {children}
    </CardContainer>
  );
};
