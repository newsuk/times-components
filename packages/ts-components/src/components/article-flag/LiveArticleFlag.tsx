import React from 'react';
import { ContainerWithBackgroundColor, BulletContainer, Title } from './styles';

export const LiveArticleFlag: React.FC = () => (
  <ContainerWithBackgroundColor>
    <BulletContainer>{'\u25c6'}</BulletContainer>
    <Title>LIVE</Title>
  </ContainerWithBackgroundColor>
);
