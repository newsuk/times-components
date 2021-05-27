import React from 'react';

import { AspectRatios } from '../../types/aspectRatio';

import { AspectRatioContainer } from './styles';

export const AspectRatio: React.FC<{
  ratio?: AspectRatios;
}> = ({ ratio, children }) => (
  <AspectRatioContainer ratio={ratio}>{children}</AspectRatioContainer>
);
