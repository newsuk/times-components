import React from 'react';
import { Container, BulletContainer, ContentContainer, Title } from './styles';

export const LiveArticleFlag: React.FC = () => (
  <Container>
    <BulletContainer>{'\u25c6'}</BulletContainer>
    <ContentContainer>
      <Title>LIVE</Title>
    </ContentContainer>
  </Container>
);
