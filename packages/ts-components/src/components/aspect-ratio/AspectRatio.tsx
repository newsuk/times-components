import React from 'react';

import { AspectRatioContainer } from './styles';

export const AspectRatio: React.FC<{
  ratio?: string;
}> = ({ ratio, children }) => (
  <AspectRatioContainer ratio={ratio}>{children}</AspectRatioContainer>
);
