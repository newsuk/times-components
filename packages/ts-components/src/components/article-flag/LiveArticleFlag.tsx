import React from 'react';
import { Container, BulletContainer, Title } from './styles';

export const LiveArticleFlag: React.FC = () => (
  <Container>
    <BulletContainer>{'\u25c6'}</BulletContainer>
    <Title>LIVE</Title>
  </Container>
);
