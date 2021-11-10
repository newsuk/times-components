import React from 'react';
import { colours } from '@times-components/styleguide';
import { gqlRgbaToStyle } from '@times-components/utils';
import { Container, BulletContainer, ContentContainer, Title } from './styles';

export const LiveArticleFlag: React.FC = () => (
    <Container>
        <BulletContainer>
            {'\u25c6'}
        </BulletContainer>
        <ContentContainer>
            <Title>LIVE</Title>
        </ContentContainer>
    </Container>
);

