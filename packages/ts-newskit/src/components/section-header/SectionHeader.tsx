import React from 'react';
import { SectionHeaderText } from './style'

export const SectionHeaderName: React.FC<{ title: string }> = ( {title} ) => {
  return (
    <SectionHeaderText>{title}</SectionHeaderText>
  );
};